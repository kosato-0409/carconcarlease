'use server'

import { sql } from '@/lib/db'
import { initVehiclesTable } from '@/lib/init-db'

export type Vehicle = {
  id: number
  line_user_id: string
  region: string
  classification_no: string
  hiragana: string
  number: string
  inspection_expiry: string | null
  created_at: string
}

/**
 * 車両情報を取得
 */
export async function getVehicle(lineUserId: string): Promise<Vehicle | null> {
  try {
    // テーブルが存在しない場合は作成
    await initVehiclesTable()

    const result = await sql<Vehicle>`
      SELECT * FROM vehicles 
      WHERE line_user_id = ${lineUserId}
      LIMIT 1
    `

    return result.rows[0] || null
  } catch (error) {
    console.error('車両情報の取得に失敗しました:', error)
    throw error
  }
}

/**
 * 車両情報を登録
 */
export async function createVehicle(
  lineUserId: string,
  data: {
    region: string
    classification_no: string
    hiragana: string
    number: string
    inspection_expiry?: string | null
  }
): Promise<Vehicle> {
  try {
    // テーブルが存在しない場合は作成
    await initVehiclesTable()

    const result = await sql<Vehicle>`
      INSERT INTO vehicles (
        line_user_id,
        region,
        classification_no,
        hiragana,
        number,
        inspection_expiry
      ) VALUES (
        ${lineUserId},
        ${data.region},
        ${data.classification_no},
        ${data.hiragana},
        ${data.number},
        ${data.inspection_expiry || null}
      )
      ON CONFLICT (line_user_id) 
      DO UPDATE SET
        region = EXCLUDED.region,
        classification_no = EXCLUDED.classification_no,
        hiragana = EXCLUDED.hiragana,
        number = EXCLUDED.number,
        inspection_expiry = EXCLUDED.inspection_expiry
      RETURNING *
    `

    return result.rows[0]
  } catch (error) {
    console.error('車両情報の登録に失敗しました:', error)
    throw error
  }
}

/**
 * 全車両情報を取得（管理者用）
 */
export async function getAllVehicles(): Promise<Vehicle[]> {
  try {
    await initVehiclesTable()

    const result = await sql<Vehicle>`
      SELECT * FROM vehicles
      ORDER BY created_at DESC
    `

    return result.rows
  } catch (error) {
    console.error('車両情報一覧の取得に失敗しました:', error)
    throw error
  }
}

/**
 * 車両情報を更新（管理者用）
 * 
 * 将来的な拡張: Salesforce連携フラグなどの追加フィールドを更新する場合は、
 * dataパラメータに以下を追加できます:
 * - salesforce_synced?: boolean
 * - salesforce_synced_at?: string | null
 * - その他のカスタムフィールド
 */
export async function updateVehicleAdmin(
  vehicleId: number,
  data: {
    inspection_expiry?: string | null
    // 将来的に追加可能: salesforce_synced?: boolean, salesforce_synced_at?: string | null
  }
): Promise<Vehicle> {
  try {
    const result = await sql<Vehicle>`
      UPDATE vehicles
      SET inspection_expiry = ${data.inspection_expiry || null}
      WHERE id = ${vehicleId}
      RETURNING *
    `

    if (result.rows.length === 0) {
      throw new Error('車両情報が見つかりません')
    }

    return result.rows[0]
  } catch (error) {
    console.error('車両情報の更新に失敗しました:', error)
    throw error
  }
}

