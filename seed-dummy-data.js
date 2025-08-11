// Seed Dummy Chat Data Script
// Run with: node seed-dummy-data.js
// This will populate your MongoDB with sample chat conversations

const { MongoClient, ServerApiVersion } = require('mongodb');

// Get MongoDB URI from environment variable
const uri = process.env.REACT_APP_MONGODB_URI || process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MongoDB URI not found in environment variables!');
  console.log('💡 Set REACT_APP_MONGODB_URI environment variable first');
  console.log('💡 Example: export REACT_APP_MONGODB_URI="mongodb+srv://..."');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Sample chat conversations
const dummyChats = [
  {
    sessionId: 'session_demo_001',
    userId: 'demo_user_1',
    messages: [
      {
        role: 'user',
        content: 'Hi Medusa! Can you tell me about Chan Dinh?',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        tokens: 12
      },
      {
        role: 'assistant',
        content: "Hey there! I'd love to tell you about Chan Dinh! He's an amazing AI/ML developer with a really impressive background. He's currently pursuing his Bachelor of Science in Computer Science at the University of Central Florida with an outstanding 3.95 GPA. What specifically would you like to know about him?",
        timestamp: new Date(Date.now() - 3500000), // 58 minutes ago
        tokens: 45
      },
      {
        role: 'user',
        content: 'What are his technical skills?',
        timestamp: new Date(Date.now() - 3400000), // 57 minutes ago
        tokens: 8
      },
      {
        role: 'assistant',
        content: "Chan has an impressive technical skill set! He's proficient in Python, JavaScript, React, Node.js, and has experience with machine learning frameworks like PyTorch and TensorFlow. He's also skilled in data analysis, SQL, and cloud platforms. His projects show expertise in computer vision, natural language processing, and time series forecasting. He's definitely someone who can handle both frontend and backend development!",
        timestamp: new Date(Date.now() - 3300000), // 56 minutes ago
        tokens: 67
      }
    ],
    totalTokens: 132,
    metadata: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      ipAddress: '192.168.1.100',
      location: 'Orlando, FL'
    },
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3300000)
  },
  {
    sessionId: 'session_demo_002',
    userId: 'demo_user_2',
    messages: [
      {
        role: 'user',
        content: 'Tell me about Chan\'s projects',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        tokens: 8
      },
      {
        role: 'assistant',
        content: "Chan has some really cool projects! His standout project is 'Project Pæmon' - an AI web app that won Best Personal Project at the Nosu AI Hackathon with a $650 prize! It's a Pokémon-inspired AI companion generator. He also built an MNIST digit classifier using neural networks, a bike sharing demand prediction system using AutoGluon, and a dog breed classifier with PyTorch. His projects demonstrate strong ML fundamentals and practical application skills.",
        timestamp: new Date(Date.now() - 7100000), // 1 hour 58 minutes ago
        tokens: 89
      },
      {
        role: 'user',
        content: 'That sounds amazing! What about his work experience?',
        timestamp: new Date(Date.now() - 7000000), // 1 hour 57 minutes ago
        tokens: 12
      },
      {
        role: 'assistant',
        content: "Chan has valuable work experience! He's currently working as a Software Engineer at Medusa, where he's been developing and maintaining web applications. Before that, he worked as a Research Assistant at UCF, contributing to academic research projects. He also has experience as a Teaching Assistant, helping other students learn computer science concepts. His work experience shows he can apply his technical skills in real-world settings and collaborate effectively with teams.",
        timestamp: new Date(Date.now() - 6900000), // 1 hour 56 minutes ago
        tokens: 78
      }
    ],
    totalTokens: 187,
    metadata: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ipAddress: '192.168.1.101',
      location: 'Miami, FL'
    },
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(Date.now() - 6900000)
  },
  {
    sessionId: 'session_demo_003',
    userId: 'demo_user_3',
    messages: [
      {
        role: 'user',
        content: 'How can I contact Chan?',
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
        tokens: 7
      },
      {
        role: 'assistant',
        content: "Great question! You can contact Chan through several channels. His email is chandinh.jobs@gmail.com, and his phone number is +1 (689) 345-3588. He's located in Casselberry, FL and is currently available for new opportunities. He's also active on LinkedIn, so you can connect with him there. Chan is always open to discussing new projects, collaborations, or just having a chat about technology!",
        timestamp: new Date(Date.now() - 10700000), // 2 hours 58 minutes ago
        tokens: 82
      },
      {
        role: 'user',
        content: 'Thanks! What are his achievements?',
        timestamp: new Date(Date.now() - 10600000), // 2 hours 57 minutes ago
        tokens: 6
      },
      {
        role: 'assistant',
        content: "Chan has some impressive achievements! He won Best Personal Project at the Nosu AI Hackathon for his AI companion generator, earning $650. He maintains a 3.95 GPA at UCF, which is exceptional. He's been recognized for his academic excellence and has received multiple scholarships. His projects have been featured in hackathons and competitions, showing his ability to create innovative solutions under pressure. He's definitely someone who excels both academically and in practical applications!",
        timestamp: new Date(Date.now() - 10500000), // 2 hours 56 minutes ago
        tokens: 76
      }
    ],
    totalTokens: 171,
    metadata: {
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      ipAddress: '192.168.1.102',
      location: 'Tampa, FL'
    },
    createdAt: new Date(Date.now() - 10800000),
    updatedAt: new Date(Date.now() - 10500000)
  },
  {
    sessionId: 'session_demo_004',
    userId: 'demo_user_4',
    messages: [
      {
        role: 'user',
        content: 'What programming languages does Chan know?',
        timestamp: new Date(Date.now() - 14400000), // 4 hours ago
        tokens: 9
      },
      {
        role: 'assistant',
        content: "Chan is proficient in several programming languages! His primary languages include Python (for ML/AI projects), JavaScript/TypeScript (for web development), and he also knows Java, C++, and SQL. He's particularly strong in Python for data science and machine learning applications, and JavaScript for building modern web applications with React and Node.js. His diverse language knowledge allows him to work on both AI/ML projects and full-stack web development.",
        timestamp: new Date(Date.now() - 14300000), // 3 hours 58 minutes ago
        tokens: 89
      },
      {
        role: 'user',
        content: 'Does he know React?',
        timestamp: new Date(Date.now() - 14200000), // 3 hours 57 minutes ago
        tokens: 5
      },
      {
        role: 'assistant',
        content: "Absolutely! Chan is very proficient in React. He's built several web applications using React, including this portfolio website you're chatting on right now! He's also experienced with modern React features like hooks, context API, and functional components. His React skills are complemented by his knowledge of TypeScript, Tailwind CSS, and other modern web technologies. He can build responsive, interactive user interfaces and has experience with state management and API integration.",
        timestamp: new Date(Date.now() - 14100000), // 3 hours 56 minutes ago
        tokens: 95
      }
    ],
    totalTokens: 198,
    metadata: {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
      ipAddress: '192.168.1.103',
      location: 'Jacksonville, FL'
    },
    createdAt: new Date(Date.now() - 14400000),
    updatedAt: new Date(Date.now() - 14100000)
  }
];

async function seedDummyData() {
  try {
    console.log('🌱 Starting to seed dummy chat data...\n');
    
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db('portfolio');
    const collection = db.collection('Chat');
    
    // Clear existing demo data (optional)
    console.log('🧹 Clearing existing demo data...');
    const deleteResult = await collection.deleteMany({ 
      sessionId: { $regex: /^session_demo_/ } 
    });
    console.log(`   Deleted ${deleteResult.deletedCount} existing demo sessions`);
    
    // Insert dummy data
    console.log('\n📝 Inserting dummy chat data...');
    const insertResult = await collection.insertMany(dummyChats);
    console.log(`   ✅ Successfully inserted ${insertResult.insertedCount} chat sessions`);
    
    // Display summary
    console.log('\n📊 Dummy Data Summary:');
    console.log(`   Total sessions: ${insertResult.insertedCount}`);
    console.log(`   Total messages: ${dummyChats.reduce((sum, chat) => sum + chat.messages.length, 0)}`);
    console.log(`   Total tokens: ${dummyChats.reduce((sum, chat) => sum + chat.totalTokens, 0)}`);
    
    // Show session details
    console.log('\n🗂️  Chat Sessions Created:');
    dummyChats.forEach((chat, index) => {
      console.log(`   ${index + 1}. ${chat.sessionId} - ${chat.messages.length} messages (${chat.totalTokens} tokens)`);
    });
    
    // Verify data was inserted
    const totalDocs = await collection.countDocuments();
    console.log(`\n📈 Total documents in Chat collection: ${totalDocs}`);
    
    console.log('\n🎉 Dummy data seeding completed successfully!');
    console.log('💡 You can now test the chat history system with this sample data');
    
  } catch (error) {
    console.error('❌ Error seeding dummy data:', error);
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the seeding
console.log('🚀 Starting Dummy Data Seeding...\n');
console.log('📍 Target: portfolio.Chat collection\n');
seedDummyData().catch(console.error);
