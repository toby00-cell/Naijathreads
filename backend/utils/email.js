import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

const FROM = `Naija Threads <${process.env.GMAIL_USER}>`;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function sendOrderConfirmation({ to, order }) {
  const itemsList = order.items.map(item =>
    `${item.name} (${item.size}, ${item.color}) x${item.qty} — ₦${item.price.toLocaleString()}`
  ).join('\n');

  await transporter.sendMail({
    from: FROM,
    to,
    subject: `Order Confirmed — ${order.id}`,
    text: `
Hi ${order.customerName},

Thank you for your order! Here's your summary:

Order ID: ${order.id}

Items:
${itemsList}

Subtotal: ₦${order.subtotal.toLocaleString()}
Shipping: ₦${order.shipping.toLocaleString()}
Total: ₦${order.total.toLocaleString()}

Delivery to:
${order.delivery.fullName}
${order.delivery.address}, ${order.delivery.location}

We'll notify you once your order ships.

— Naija Threads
    `.trim(),
  });
}

export async function sendAdminOrderAlert({ order }) {
  const itemsList = order.items.map(item =>
    `${item.name} (${item.size}, ${item.color}) x${item.qty} — ₦${item.price.toLocaleString()}`
  ).join('\n');

  await transporter.sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Order — ${order.id} (₦${order.total.toLocaleString()})`,
    text: `
New order received!

Order ID: ${order.id}
Customer: ${order.customerName} (${order.customerEmail})

Items:
${itemsList}

Total: ₦${order.total.toLocaleString()}

Ship to:
${order.delivery.fullName}
${order.delivery.address}, ${order.delivery.location}
Phone: ${order.delivery.phone}

Payment: ${order.payment}
    `.trim(),
  });
}