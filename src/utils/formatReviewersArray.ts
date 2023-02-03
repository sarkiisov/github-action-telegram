export interface ReviewUser {
  login: string;
  html_url: string;
}

export const formatReviewersArray = (reviewers: ReviewUser[]) => reviewers.map((user) => `<a href="${user.html_url}">${user.login}</a>`).join(',\n');
