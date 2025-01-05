import mongoose from 'mongoose'
import { Mongo_Url } from './Config/Keys.js'
import Service from './Model/ServicesModel.js'
const servicesData = [
  {
    title: 'Engine Oil Change',
    image: '/images/engine-oil.jpg',
    description:
      'Regular engine oil changes to keep your engine running smoothly.',
    price: 'PKR 6,000',
    category: 'Maintenance',
  },
  {
    title: 'Air Filter Change',
    image: '/images/air-filter.jpg',
    description:
      'Replace your air filter to improve engine efficiency and performance.',
    price: 'PKR 1,500',
    category: 'Maintenance',
  },
  {
    title: 'Puncture Repair',
    image: '/images/puncture-repair.jpg',
    description: 'Quick and reliable tire puncture repair service.',
    price: 'PKR 500',
    category: 'Maintenance',
  },
  {
    title: 'Stickers',
    image: '/images/stickers.jpg',
    description: 'Custom stickers to give your ride a unique personality.',
    price: 'PKR 3,000',
    category: 'Customization',
  },
  {
    title: 'Customized Silencer',
    image: '/images/custom-silencer.jpg',
    description: 'Upgrade your silencer for enhanced sound and style.',
    price: 'PKR 10,000',
    category: 'Customization',
  },
  {
    title: 'Customized Backlight',
    image: '/images/custom-backlight.jpg',
    description: 'Stylish and bright backlights for a modern touch.',
    price: 'PKR 8,000',
    category: 'Customization',
  },
  {
    title: 'Customized Headlight',
    image: '/images/custom-headlight.jpg',
    description: 'Upgrade to LED or colored headlights for a sleek look.',
    price: 'PKR 12,000',
    category: 'Customization',
  },
  {
    title: 'Indicators',
    image: '/images/indicators.jpg',
    description: 'Custom indicators for better visibility and style.',
    price: 'PKR 4,000',
    category: 'Customization',
  },
]

const seedServices = async () => {
  try {
    await mongoose.connect(Mongo_Url) // Replace with your MongoDB connection string
    await Service.insertMany(servicesData)
    console.log('Services seeded successfully!')
    mongoose.connection.close()
  } catch (error) {
    console.error('Error seeding services:', error)
    mongoose.connection.close()
  }
}

seedServices()
