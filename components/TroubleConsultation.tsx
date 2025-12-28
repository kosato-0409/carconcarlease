'use client'

export default function TroubleConsultation() {
  const handlePhoneCall = () => {
    window.location.href = 'tel:0120-XXX-XXX'
  }

  const handleChatSupport = () => {
    // LINE 1:1トークへのリンク（実際のURLに置き換える必要があります）
    window.open('https://line.me/R/ti/p/@your-official-account', '_blank')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">事故・トラブル相談</h2>
      </div>

      <div className="space-y-3">
        <p className="text-gray-600 text-sm mb-4">
          事故やトラブルが発生した場合は、お気軽にご連絡ください。
        </p>

        <button
          onClick={handlePhoneCall}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span>📞</span>
          <span>電話で相談する</span>
        </button>

        <button
          onClick={handleChatSupport}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span>💬</span>
          <span>LINEで相談する</span>
        </button>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>緊急時:</strong> 24時間対応のサポートダイヤルもご利用いただけます。
          </p>
        </div>
      </div>
    </div>
  )
}

