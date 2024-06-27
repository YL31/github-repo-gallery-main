// Section for profile information//
const overview = document.querySelector(".overview");
const showRepoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
const username = "YL31";


const getProfile = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  displayUserInfo(data);
};
getProfile();

const displayUserInfo = function (data) {
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-info");
  userDiv.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  overview.append(userDiv);
  fetchRepos();
};

const fetchRepos = async function () {
  const repoList = await fetch(`https://api.github.com/users/${username}/repos?visibility=public&sort=updated&per_page=100`);
  const repos = await repoList.json();
  displayRepoInfo(repos);
};

const displayRepoInfo = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    showRepoList.append(listItem);
  }
};

showRepoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    specificRepoInfo(repoName);
  }
});

const specificRepoInfo = async function (repoName) {
  const getSpecificInfo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await getSpecificInfo.json();
  // Get the languages
  const fetchLanguages = await fetch(
    repoInfo.languages_url
  );
  const languageData = await fetchLanguages.json();
  // List the languages
  let languages = [];
  for (let language in languageData) {
    languages.push(language);
    displaySpecificInfo(repoInfo, languages);
  }
};
// Show information for specific repo
const displaySpecificInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  let repoDiv = document.createElement("div");
  repoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(repoDiv);
  repoData.classList.remove("hide");
  repoSection.classList.add("hide");
  backToRepo.classList.remove("hide");
};

// Back to repos button
backToRepo.addEventListener("click", function () {
  repoData.classList.add("hide");
  repoSection.classList.remove("hide");
  backToRepo.classList.add("hide");
});

// Dynamic search
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const allRepos = document.querySelectorAll(".repo");
  const searchLowerCaseText = searchText.toLowerCase();

  for (const repo of allRepos) {
    const repoLowerCaseText = repo.innerText;
    if (repoLowerCaseText.includes(searchLowerCaseText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
