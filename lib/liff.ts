import liff from '@line/liff'

export type LiffUser = {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

export type LiffState = {
  isLoggedIn: boolean
  user: LiffUser | null
  error: string | null
  isLoading: boolean
}

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID || ''

/**
 * LIFF SDKが読み込まれるまで待つ
 */
const waitForLiffSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('SSR環境では実行できません'))
      return
    }

    // 既に読み込まれている場合
    if (window.liff) {
      resolve()
      return
    }

    // SDKスクリプトが既に読み込まれているか確認
    const existingScript = document.querySelector('script[src*="liff"]')
    if (existingScript) {
      // スクリプトの読み込み完了を待つ
      const checkInterval = setInterval(() => {
        if (window.liff) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)

      // タイムアウト設定（10秒）
      setTimeout(() => {
        clearInterval(checkInterval)
        reject(new Error('LIFF SDKの読み込みがタイムアウトしました'))
      }, 10000)

      existingScript.addEventListener('error', () => {
        clearInterval(checkInterval)
        reject(new Error('LIFF SDKの読み込みに失敗しました'))
      })
      return
    }

    reject(new Error('LIFF SDKスクリプトが見つかりません'))
  })
}

/**
 * LIFF初期化関数
 */
export const initLiff = async (): Promise<LiffState> => {
  try {
    if (typeof window === 'undefined') {
      return {
        isLoggedIn: false,
        user: null,
        error: 'SSR環境では実行できません',
        isLoading: false,
      }
    }

    // LIFF SDKが読み込まれるまで待つ
    await waitForLiffSDK()

    // LIFF初期化
    await liff.init({ liffId: LIFF_ID })

    // ログイン状態を確認
    if (!liff.isLoggedIn()) {
      // ログインしていない場合はログインを促す
      liff.login()
      return {
        isLoggedIn: false,
        user: null,
        error: null,
        isLoading: true,
      }
    }

    // ユーザー情報を取得
    const profile = await liff.getProfile()
    const user: LiffUser = {
      userId: profile.userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage,
    }

    return {
      isLoggedIn: true,
      user,
      error: null,
      isLoading: false,
    }
  } catch (error) {
    console.error('LIFF初期化エラー:', error)
    return {
      isLoggedIn: false,
      user: null,
      error: error instanceof Error ? error.message : 'LIFF初期化に失敗しました',
      isLoading: false,
    }
  }
}

/**
 * LIFFログアウト関数
 */
export const logoutLiff = async (): Promise<void> => {
  try {
    if (typeof window === 'undefined') {
      return
    }
    await waitForLiffSDK()
    if (liff.isLoggedIn()) {
      liff.logout()
    }
  } catch (error) {
    console.error('LIFFログアウトエラー:', error)
  }
}

