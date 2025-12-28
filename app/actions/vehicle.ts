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

