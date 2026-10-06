// composables/useGithubApi.ts
export const useGithubApi = () => {
  const fetchRepositories = async (username: string, count: number = 10) => {
    try {
      const response = await $fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=updated`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        }
      })
      
      // Transform the data to match what we need for insights
      return response.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
        updated_at: new Date(repo.updated_at),
        pushed_at: new Date(repo.pushed_at),
        visibility: repo.visibility,
        topics: repo.topics || []
      }))
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error)
      return []
    }
  }

  const fetchRepoInsights = async (username: string, repoName: string) => {
    try {
      const response = await $fetch(`https://api.github.com/repos/${username}/${repoName}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        }
      })

      return {
        id: response.id,
        name: response.name,
        description: response.description,
        html_url: response.html_url,
        stargazers_count: response.stargazers_count,
        forks_count: response.forks_count,
        language: response.language,
        updated_at: new Date(response.updated_at),
        pushed_at: new Date(response.pushed_at),
        visibility: response.visibility,
        topics: response.topics || [],
        size: response.size,
        open_issues_count: response.open_issues_count,
        default_branch: response.default_branch
      }
    } catch (error) {
      console.error('Error fetching GitHub repository insights:', error)
      return null
    }
  }

  return {
    fetchRepositories,
    fetchRepoInsights
  }
}