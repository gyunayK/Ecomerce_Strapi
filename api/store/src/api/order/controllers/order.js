const Stripe = require('stripe');


// @ts-ignore
const stripe = new Stripe(process.env.STIPE_KEY, {
    apiVersion: null 
});


'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => { // fixed the typo here

    return {
        async create(ctx) {
            const { products } = ctx.request.body;

            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi
                        .service('api::product.product')
                        .findOne(product.id)

                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: product.quantity,
                    };
                })
            );

            try {
                const session = await stripe.checkout.sessions.create({ // Added await and fixed the method call
                    mode: 'payment',
                    success_url: `${process.env.CLIENT_URL}?success=true`,
                    cancel_url: `${process.env.CLIENT_URL}?success=false`,
                    line_items: lineItems, // Changed the key to line_items
                    shipping_address_collection: { allowed_countries: ['US', 'CA'] },
                    payment_method_types: ['card'],
                });

                await strapi.service('api::order.order').create({
                    data: {
                        products,
                        stripeId: session.id,
                    }
                });

                return { stripeSession: session };

            } catch (err) {
                ctx.response.status = 500;
                return err;
            }
        }
    };
});
