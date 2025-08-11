import { useTheme } from '../context/ThemeContext'

export default function FaqsPage() {
  const { isDarkMode } = useTheme()

  const faqs = [
    { question: 'What is this app for?', answer: 'This is a simple to-do list application to manage your daily tasks.' },
    { question: 'How do I add a new task?', answer: 'Click the "Add Task" button on the dashboard and fill out the form.' },
    { question: 'Can I edit an existing task?', answer: 'Yes, click the pencil icon next to a task to edit it.' },
    { question: 'How do I delete a task?', answer: 'Click the trash icon next to a task to permanently delete it.' },
  ]

  return (
    <div className={`p-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}