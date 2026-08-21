'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'
import { ArrowLeft, Plus, X, Save, Loader2 } from 'lucide-react'

export default function CreateTestPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([
    { id: 1, question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'MOCK_TEST',
    duration: 60,
    totalMarks: 100,
    passingMarks: 40,
    negativeMarks: 0.25,
    courseId: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, question: '', options: ['', '', '', ''], correctAnswer: 0 }
    ])
  }

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id))
    }
  }

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        return { ...q, [field]: value }
      }
      return q
    }))
  }

  const updateOption = (qId: number, oIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options]
        newOptions[oIndex] = value
        return { ...q, options: newOptions }
      }
      return q
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('✅ Test created successfully!')
      setTimeout(() => router.push('/teacher'), 1500)

    } catch (error) {
      alert('Failed to create test')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/teacher">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <h1 className="text-2xl font-bold gradient-text mb-6">Create Test</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Test Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Test Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter test title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter test description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Test Type</Label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800"
                  >
                    <option value="MOCK_TEST">Mock Test</option>
                    <option value="CHAPTER_TEST">Chapter Test</option>
                    <option value="SUBJECT_TEST">Subject Test</option>
                    <option value="DAILY_QUIZ">Daily Quiz</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    name="totalMarks"
                    type="number"
                    value={formData.totalMarks}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="passingMarks">Passing Marks</Label>
                  <Input
                    id="passingMarks"
                    name="passingMarks"
                    type="number"
                    value={formData.passingMarks}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="negativeMarks">Negative Marks</Label>
                  <Input
                    id="negativeMarks"
                    name="negativeMarks"
                    type="number"
                    step="0.01"
                    value={formData.negativeMarks}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Questions</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-4 border rounded-lg relative">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Question {idx + 1}</h4>
                    {questions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => removeQuestion(q.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Question Text</Label>
                      <Textarea
                        placeholder="Enter question"
                        value={q.question}
                        onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx}>
                          <Label>Option {String.fromCharCode(65 + oIdx)}</Label>
                          <Input
                            placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                            value={opt}
                            onChange={(e) => updateOption(q.id, oIdx, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <Label>Correct Answer</Label>
                      <select
                        value={q.correctAnswer}
                        onChange={(e) => updateQuestion(q.id, 'correctAnswer', parseInt(e.target.value))}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800"
                      >
                        {q.options.map((_, idx) => (
                          <option key={idx} value={idx}>
                            Option {String.fromCharCode(65 + idx)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Test...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Test
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}