export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">プライバシーポリシー</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. 個人情報の取り扱いについて</h2>
          <p className="text-gray-600 leading-relaxed">
            本アプリケーションでは、サービス提供のために必要な範囲で個人情報を収集・利用いたします。
            収集する個人情報には、LINEアカウント情報（ユーザーID、表示名、プロフィール画像等）が含まれます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">2. 個人情報の利用目的</h2>
          <p className="text-gray-600 leading-relaxed">
            収集した個人情報は、以下の目的で利用いたします：
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-3 ml-4">
            <li>サービス提供および運営のため</li>
            <li>ユーザーサポートのため</li>
            <li>サービス改善のため</li>
            <li>重要な通知やお知らせの送信のため</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. 個人情報の第三者提供</h2>
          <p className="text-gray-600 leading-relaxed">
            法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはございません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. 個人情報の安全管理</h2>
          <p className="text-gray-600 leading-relaxed">
            個人情報の紛失、破壊、改ざん、漏洩等を防止するため、適切な安全管理措置を講じます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. お問い合わせ</h2>
          <p className="text-gray-600 leading-relaxed">
            個人情報の取り扱いに関するお問い合わせは、お問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <section>
          <p className="text-sm text-gray-500 mt-8">
            制定日: 2024年1月1日<br />
            最終改定日: 2024年1月1日
          </p>
        </section>
      </div>
    </div>
  )
}

