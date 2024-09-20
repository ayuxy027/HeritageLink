export const museumData = {
    exhibitions: [
      {
        id: 'e1',
        title: "Ancient Civilizations",
        description: "Dive into the rich history of India's ancient civilizations, including the Indus Valley Civilization.",
        availability: "Available daily",
        time: "10:00 AM - 6:00 PM",
        price: 30,
        location: "New Delhi",
        category: "Historical",
        type: 'exhibition',
        image: "https://www.gettyimages.in/detail/photo/ruins-of-harappa-indus-valley-civilization-royalty-free-image/1176208390"
      },
      {
        id: 'e2',
        title: "Modern Art Masterpieces",
        description: "A curated collection of modern Indian art, featuring works from prominent artists such as M.F. Husain.",
        availability: "Available daily",
        time: "9:00 AM - 5:00 PM",
        price: 25,
        location: "Mumbai",
        category: "Art",
        type: 'exhibition',
        image: "https://www.gettyimages.in/detail/photo/abstract-painting-royalty-free-image/1230207749"
      },
      {
        id: 'e3',
        title: "Natural Wonders",
        description: "A captivating exhibit focusing on India's diverse ecosystems, featuring rare flora and fauna.",
        availability: "Available daily",
        time: "10:00 AM - 7:00 PM",
        price: 20,
        location: "Kolkata",
        category: "Science",
        type: 'exhibition',
        image: "https://www.gettyimages.in/detail/photo/indian-jungle-royalty-free-image/545257356"
      }
    ],
    collections: [
      {
        id: 'c1',
        title: "Prehistoric Artifacts",
        description: "Featuring tools and artifacts from the Bhimbetka Rock Shelters, dating back to 30,000 BCE.",
        location: "Hyderabad",
        price: 15,
        category: "Historical",
        type: 'collection',
        image: "https://www.gettyimages.in/detail/photo/bhimbetka-rock-shelters-royalty-free-image/1290103268"
      },
      {
        id: 'c2',
        title: "Mughal Miniatures",
        description: "A unique collection of Mughal miniature paintings, showcasing the intricate art style of the era.",
        location: "Jaipur",
        price: 40,
        category: "Art",
        type: 'collection',
        image: "https://www.gettyimages.in/detail/photo/mughal-miniature-painting-royalty-free-image/509943199"
      },
      {
        id: 'c3',
        title: "Cultural Heritage",
        description: "Explore the incredible diversity of India's cultural heritage, from textiles to sculptures.",
        location: "New Delhi",
        price: 10,
        category: "Cultural",
        type: 'collection',
        image: "https://www.gettyimages.in/detail/photo/indian-textile-art-royalty-free-image/641405272"
      }
    ],
    tours: [
      {
        id: 't1',
        title: "Guided Museum Tour",
        description: "A 90-minute expert-led tour through India's key historical periods, starting from the Mauryan Empire to modern India.",
        duration: "90 minutes",
        price: 50,
        location: "New Delhi",
        category: "Historical",
        type: 'tour',
        image: "https://www.gettyimages.in/detail/photo/museum-tour-royalty-free-image/545258903"
      },
      {
        id: 't2',
        title: "360° Virtual Experience",
        description: "Enjoy an immersive digital experience exploring key exhibits, including the Harappan collection and Gupta-era statues.",
        duration: "60 minutes",
        price: 20,
        location: "Online",
        category: "Cultural",
        type: 'tour',
        image: "https://www.gettyimages.in/detail/photo/virtual-museum-tour-royalty-free-image/545259128"
      },
      {
        id: 't3',
        title: "Kids Discovery Tour",
        description: "A fun and interactive 45-minute tour designed for children, featuring Indian myths and cultural activities.",
        duration: "45 minutes",
        price: 15,
        location: "Madurai",
        category: "Cultural",
        type: 'tour',
        image: "https://www.gettyimages.in/detail/photo/kids-museum-tour-royalty-free-image/545259774"
      }
    ]
  }
  
  export const categories = ['All', 'Historical', 'Art', 'Science', 'Cultural']
  export const durations = ['All', 'Short', 'Medium', 'Long']
  export const locations = ['All', 'New Delhi', 'Mumbai', 'Kolkata', 'Hyderabad', 'Jaipur', 'Madurai', 'Online']
  