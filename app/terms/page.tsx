export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">利用規約</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">第1条（適用）</h2>
          <p className="text-gray-600 leading-relaxed">
            本規約は、カーリース契約者向けマイページアプリケーション（以下「本サービス」といいます）の利用条件を定めるものです。
            本サービスを利用するすべてのユーザー（以下「ユーザー」といいます）は、本規約に同意した上で本サービスを利用するものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">第2条（利用登録）</h2>
          <p className="text-gray-600 leading-relaxed">
            本サービスの利用には、LINEアカウントによるログインが必要です。
            ユーザーは、LINEアカウントを使用して本サービスにログインし、サービスを利用することができます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">第3条（禁止事項）</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません：
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為</li>
            <li>本サービス、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
            <li>本サービスによって得られた情報を商業的に利用する行為</li>
            <li>本サービスの運営を妨害するおそれのある行為</li>
            <li>不正アクセスをし、またはこれを試みる行為</li>
            <li>その他、当社が不適切と判断する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">第4条（本サービスの提供の停止等）</h2>
          <p className="text-gray-600 leading-relaxed">
            当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします：
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-3 ml-4">
            <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
            <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
            <li>その他、当社が本サービスの提供が困難と判断した場合</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">第5条（保証の否認および免責）</h2>
          <p className="text-gray-600 leading-relaxed">
            当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">第6条（サービス内容の変更等）</h2>
          <p className="text-gray-600 leading-relaxed">
            当社は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">第7条（利用規約の変更）</h2>
          <p className="text-gray-600 leading-relaxed">
            当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
            なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">第8条（準拠法・裁判管轄）</h2>
          <p className="text-gray-600 leading-relaxed">
            本規約の解釈にあたっては、日本法を準拠法とします。
            本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
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

