'use client'

export default function VehicleInfo() {
  // デモデータ（実際の実装ではAPIから取得）
  const vehicleData = {
    name: 'トヨタ プリウス',
    number: '品川 530 あ 1234',
    contractEndDate: '2025年12月31日',
    contractStatus: '有効',
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">契約車両情報</h2>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
          {vehicleData.contractStatus}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
            <span className="text-3xl">🚗</span>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">
              {vehicleData.name}
            </p>
            <p className="text-sm text-gray-600">車名</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">ナンバープレート</span>
            <span className="text-gray-800 font-semibold">
              {vehicleData.number}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">契約満了日</span>
            <span className="text-gray-800 font-semibold">
              {vehicleData.contractEndDate}
            </span>
          </div>
        </div>

        <button className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          詳細を見る
        </button>
      </div>
    </div>
  )
}

