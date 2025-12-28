'use client'

export default function MaintenanceReservation() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">メンテナンス予約</h2>
      </div>

      <div className="space-y-4">
        {/* カレンダー風UIのプレースホルダー */}
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <div className="text-4xl mb-3">📅</div>
          <p className="text-gray-600 mb-2">カレンダーUI</p>
          <p className="text-sm text-gray-400">
            メンテナンス予約はこちらから
          </p>
        </div>

        {/* 次の予約がある場合の表示例（コメントアウト） */}
        {false && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">次回メンテナンス</p>
                <p className="text-sm text-gray-600">2024年1月15日 10:00</p>
              </div>
              <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                予約済み
              </span>
            </div>
          </div>
        )}

        <button className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          予約する
        </button>
      </div>
    </div>
  )
}

