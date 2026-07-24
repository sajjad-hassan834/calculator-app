import axios from 'axios';
import { CALCULATOR_META } from './src/lib/calculatorMeta';

async function seed() {
  const token = process.env.TOKEN;
  if (!token) {
    console.error("No token provided");
    return;
  }
  
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: { Authorization: `Bearer ${token}` }
  });

  for (const key of Object.keys(CALCULATOR_META)) {
    const meta = CALCULATOR_META[key];
    console.log(`Seeding ${meta.title}...`);
    try {
      await api.post('/admin/calculators', {
        name: meta.title,
        slug: meta.id,
        calculator_type: meta.id,
        engine_type: "formula",
        description: meta.explanation || meta.desc,
        short_description: meta.shortDesc,
        status: "published",
        is_popular: meta.popular || false,
        is_premium: false,
        faqs: meta.faqs || [],
        inputs: [],
        outputs: [],
        formulas: [],
        examples: [],
        references: [],
        charts: [],
        sections: []
      });
      console.log(`Successfully seeded ${meta.title}`);
    } catch (err: any) {
      console.error(`Failed to seed ${meta.title}:`, err.response?.data || err.message);
    }
  }
}

seed();
