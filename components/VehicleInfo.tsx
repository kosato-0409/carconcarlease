'use client'

import Link from 'next/link'

export type VehicleInfoProps = {
  vehicle: {
    region: string
    classification_no: string
    hiragana: string
    number: string
    inspection_expiry: string | null
  } | null
}

export default function VehicleInfo({ vehicle }: VehicleInfoProps) {
  // 車両情報がない場合
  if (!vehicle) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">契約車両情報</h2>
        </div>

        <div className="text-center py-8">
          <div className="text-4xl mb-4">🚗</div>
          <p className="text-gray-600 mb-4">車両情報が未登録です</p>
          <Link
            href="/registration"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            車両情報を登録する
          </Link>
        </div>
      </div>
    )
  }

  // ナンバープレートの表示形式
  const plateNumber = `${vehicle.region} ${vehicle.classification_no} ${vehicle.hiragana} ${vehicle.number}`

  // 車検満了日のフォーマット
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '未設定'
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">契約車両情報</h2>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
          登録済み
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
            <span className="text-3xl">🚗</span>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">
              {plateNumber}
            </p>
            <p className="text-sm text-gray-600">ナンバープレート</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">車検満了日</span>
            <span className="text-gray-800 font-semibold">
              {formatDate(vehicle.inspection_expiry)}
            </span>
          </div>
        </div>

        <Link
          href="/registration"
          className="block w-full mt-4 text-center bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          情報を更新する
        </Link>
      </div>
    </div>
  )
}
