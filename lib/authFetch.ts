export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
    const accessToken = localStorage.getItem("access_token")

    const headers = new Headers(init.headers || {})
    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`)
    }

    const response = await fetch(input, {
        ...init,
        headers,
      })
    
    // 401 → 로그인 페이지로 리다이렉트
    if (response.status === 401) {
    window.location.href = "/auth"
    }

    return response
}