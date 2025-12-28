import { sql } from './db'

/**
 * vehiclesテーブルを作成する初期化スクリプト
 * この関数はサーバーサイドでのみ実行可能
 */
export async function initVehiclesTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        line_user_id VARCHAR(255) UNIQUE NOT NULL,
        region TEXT NOT NULL,
        classification_no TEXT NOT NULL,
        hiragana TEXT NOT NULL,
        number TEXT NOT NULL,
        inspection_expiry DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('vehiclesテーブルが正常に作成されました')
  } catch (error) {
    console.error('vehiclesテーブルの作成に失敗しました:', error)
    throw error
  }
}

