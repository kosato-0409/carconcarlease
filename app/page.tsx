'use client'

import { useEffect, useState } from 'react'
import { initLiff, type LiffState } from '@/lib/liff'
import VehicleInfo from '@/components/VehicleInfo'
import MaintenanceReservation from '@/components/MaintenanceReservation'
import TroubleConsultation from '@/components/TroubleConsultation'
import Loading from './loading'

export default function Home() {
  const [liffState, setLiffState] = useState<LiffState>({
    isLoggedIn: false,
    user: null,
    error: null,
    isLoading: true,
  })

  useEffect(() => {
    const initialize = async () => {
      const state = await initLiff()
      setLiffState(state)
    }

    initialize()
  }, [])

  // ローディング中
  if (liffState.isLoading) {
    return <Loading />
  }

  // エラー時
  if (liffState.error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">エラーが発生しました</p>
          <p className="text-gray-600">{liffState.error}</p>
        </div>
      </div>
    )
  }

  // ログインしていない場合
  if (!liffState.isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-gray-600 text-lg">ログイン中...</p>
        </div>
      </div>
    )
  }

  // メインコンテンツ
  return (
    <div className="space-y-4">
      {/* ユーザー情報の表示（オプション） */}
      {liffState.user && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600">
            ようこそ、<span className="font-semibold">{liffState.user.displayName}</span>さん
          </p>
        </div>
      )}

      {/* 契約車両情報 */}
      <VehicleInfo />

      {/* メンテナンス予約 */}
      <MaintenanceReservation />

      {/* 事故・トラブル相談 */}
      <TroubleConsultation />
    </div>
  )
}

