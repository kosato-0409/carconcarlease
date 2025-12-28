'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initLiff, type LiffState } from '@/lib/liff'
import { createVehicle } from '@/app/actions/vehicle'
import Loading from '@/app/loading'

export default function RegistrationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [liffState, setLiffState] = useState<LiffState>({
    isLoggedIn: false,
    user: null,
    error: null,
    isLoading: true,
  })

  // フォームの状態
  const [formData, setFormData] = useState({
    region: '',
    classification_no: '',
    hiragana: '',
    number: '',
    inspection_expiry: '',
  })

  // LIFF初期化
  useEffect(() => {
    const initialize = async () => {
      const state = await initLiff()
      setLiffState(state)
      setIsInitializing(false)

      if (!state.isLoggedIn || !state.user) {
        // ログインしていない場合はトップページへリダイレクト
        router.push('/')
      }
    }

    initialize()
  }, [router])

  // バリデーション
  const validateForm = (): boolean => {
    if (!formData.region.trim()) {
      setError('地名を入力してください')
      return false
    }

    if (!formData.classification_no.match(/^\d{1,3}$/)) {
      setError('分類番号は1〜3桁の数字で入力してください')
      return false
    }

    if (!formData.hiragana.match(/^[あ-ん]{1}$/)) {
      setError('ひらがなは1文字で入力してください')
      return false
    }

    if (!formData.number.match(/^\d{1,4}$/)) {
      setError('車両番号は1〜4桁の数字で入力してください')
      return false
    }

    return true
  }

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    if (!liffState.user) {
      setError('ユーザーIDが取得できませんでした')
      return
    }

    setIsLoading(true)

    try {
      await createVehicle(liffState.user.userId, {
        region: formData.region.trim(),
        classification_no: formData.classification_no,
        hiragana: formData.hiragana,
        number: formData.number,
        inspection_expiry: formData.inspection_expiry || null,
      })

      // 登録成功後、トップページへリダイレクト
      router.push('/')
      router.refresh()
    } catch (err) {
      console.error('登録エラー:', err)
      setError('登録に失敗しました。再度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  if (isInitializing || isLoading) {
    return <Loading />
  }

  if (!liffState.isLoggedIn || !liffState.user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-gray-600 text-lg">ログインが必要です</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">車両情報登録</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
            地名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="region"
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            placeholder="例: 品川"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="classification_no" className="block text-sm font-medium text-gray-700 mb-2">
            分類番号（3桁まで） <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="classification_no"
            value={formData.classification_no}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, '')
              if (value.length <= 3) {
                setFormData({ ...formData, classification_no: value })
              }
            }}
            placeholder="例: 530"
            pattern="^\d{1,3}$"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-xs text-gray-500">1〜3桁の数字で入力してください</p>
        </div>

        <div>
          <label htmlFor="hiragana" className="block text-sm font-medium text-gray-700 mb-2">
            ひらがな <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="hiragana"
            value={formData.hiragana}
            onChange={(e) => {
              const value = e.target.value.replace(/[^あ-ん]/g, '')
              if (value.length <= 1) {
                setFormData({ ...formData, hiragana: value })
              }
            }}
            placeholder="例: あ"
            pattern="^[あ-ん]{1}$"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-xs text-gray-500">ひらがな1文字で入力してください</p>
        </div>

        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
            車両番号（4桁まで） <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="number"
            value={formData.number}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, '')
              if (value.length <= 4) {
                setFormData({ ...formData, number: value })
              }
            }}
            placeholder="例: 1234"
            pattern="^\d{1,4}$"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-xs text-gray-500">1〜4桁の数字で入力してください</p>
        </div>

        <div>
          <label htmlFor="inspection_expiry" className="block text-sm font-medium text-gray-700 mb-2">
            車検満了日（任意）
          </label>
          <input
            type="date"
            id="inspection_expiry"
            value={formData.inspection_expiry}
            onChange={(e) => setFormData({ ...formData, inspection_expiry: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            登録する
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>ナンバープレートの例:</strong> 品川 530 あ 1234
        </p>
      </div>
    </div>
  )
}

