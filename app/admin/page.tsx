'use client'

import { useEffect, useState } from 'react'
import { getAllVehicles, updateVehicleAdmin, type Vehicle } from '@/app/actions/vehicle'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editDate, setEditDate] = useState<string>('')

  // データ取得
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true)
        const data = await getAllVehicles()
        setVehicles(data)
      } catch (error) {
        console.error('データ取得エラー:', error)
        toast.error('データの取得に失敗しました')
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  // 編集開始
  const handleEditStart = (vehicle: Vehicle) => {
    setEditingId(vehicle.id)
    setEditDate(vehicle.inspection_expiry ? vehicle.inspection_expiry.split('T')[0] : '')
  }

  // 編集キャンセル
  const handleEditCancel = () => {
    setEditingId(null)
    setEditDate('')
  }

  // 更新処理
  const handleUpdate = async (vehicleId: number) => {
    try {
      await updateVehicleAdmin(vehicleId, {
        inspection_expiry: editDate || null,
      })

      // ローカルステートを更新
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === vehicleId
            ? { ...v, inspection_expiry: editDate || null }
            : v
        )
      )

      setEditingId(null)
      setEditDate('')
      toast.success('車検満了日を更新しました')
    } catch (error) {
      console.error('更新エラー:', error)
      toast.error('更新に失敗しました')
    }
  }

  // ナンバープレート表示形式
  const formatPlateNumber = (vehicle: Vehicle) => {
    return `${vehicle.region} ${vehicle.classification_no} ${vehicle.hiragana} ${vehicle.number}`
  }

  // 日付表示形式
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">車両一覧</h1>
          <p className="mt-1 text-sm text-gray-500">
            登録されている全車両の情報を表示・編集できます
          </p>
        </div>

        {isLoading ? (
          <div className="px-6 py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">読み込み中...</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            登録されている車両がありません
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LINEユーザーID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ナンバープレート
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    車検満了日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    登録日
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900">
                        {vehicle.line_user_id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatPlateNumber(vehicle)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === vehicle.id ? (
                        <input
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {formatDate(vehicle.inspection_expiry)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(vehicle.created_at).toLocaleDateString('ja-JP')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingId === vehicle.id ? (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleUpdate(vehicle.id)}
                            className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                          >
                            保存
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                          >
                            キャンセル
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditStart(vehicle)}
                          className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                        >
                          編集
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">
            合計: {vehicles.length} 件
          </p>
        </div>
      </div>
  )
}

