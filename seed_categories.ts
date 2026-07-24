import axios from 'axios';
import { CATEGORIES } from './src/lib/data';

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

  for (const cat of CATEGORIES) {
    console.log(`Seeding category ${cat.label}...`);
    try {
      await api.post('/admin/categories', {
        name: cat.label,
        slug: cat.id,
        description: cat.desc,
        status: "published",
        is_active: true,
        sort_order: CATEGORIES.indexOf(cat)
      });
      console.log(`Successfully seeded ${cat.label}`);
    } catch (err: any) {
      console.error(`Failed to seed ${cat.label}:`, err.response?.data || err.message);
    }
  }
}

seed();
