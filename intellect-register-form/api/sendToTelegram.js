export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { name, surname, phone, course } = req.body;
  
    const text = `
  📝 Yangi ariza
  👤 Ism: ${name}
  👤 Familiya: ${surname}
  📞 Telefon: ${phone}
  📚 Kurs: ${course}
    `;
  
    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text
      })
    });
  
    res.status(200).json({ success: true });
  }
  