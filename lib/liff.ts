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

    // LIFF IDが設定されているか確認
    if (!LIFF_ID) {
      return {
        isLoggedIn: false,
        user: null,
        error: 'LIFF IDが設定されていません。環境変数NEXT_PUBLIC_LIFF_IDを設定してください。',
        isLoading: false,
      }
    }

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
    if (typeof window !== 'undefined' && liff.isLoggedIn()) {
      liff.logout()
    }
  } catch (error) {
    console.error('LIFFログアウトエラー:', error)
  }
}
