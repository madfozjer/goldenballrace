#!/usr/bin/env sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Starting local deployment ---"

# 1. Build the main Vue.js app and the VuePress blog, then combine them into 'dist'
# This command runs "npm run build:main && npm run build:blog && node scripts/copy-blog-assets.js"
echo "Building site with 'npm run build'..."
npm run build

# Check if 'dist' directory was created and contains content
if [ ! -d "dist" ]; then
  echo "ERROR: 'dist' directory not found after build. Aborting deployment."
  exit 1
fi
if [ -z "$(ls -A dist)" ]; then
  echo "WARNING: 'dist' directory is empty after build. Check your build scripts."
fi
echo "Site built successfully into 'dist'."

# 2. Navigate into the final combined build output directory
echo "Changing directory to 'dist'..."
cd dist

# 3. Create CNAME file for custom domain
# IMPORTANT: Replace 'www.golden-ball-race.eu' with your actual custom domain
echo "Creating CNAME file with www.golden-ball-race.eu..."
echo 'www.golden-ball-race.eu' > CNAME

# Optional: Add a .nojekyll file to prevent Jekyll processing (good practice)
echo "Creating .nojekyll file..."
touch .nojekyll

# 4. Initialize a git repository in 'dist' and stage all files
echo "Initializing git repository in 'dist' and staging files..."
git init
git add -A # This command stages ALL files in the current directory ('dist')
git commit -m 'deploy' # Commit all staged changes

# 5. Force push the contents of 'dist' to the 'gh-pages' branch
# IMPORTANT: Replace <YOUR_USERNAME> and <YOUR_REPOSITORY> with your GitHub username and repository name
echo "Force pushing 'dist' contents to gh-pages branch..."
git push -f git@github.com:madfozjer/goldenballrace.git master:gh-pages

# Go back to the project root
echo "Returning to project root..."
cd -

echo "--- Local deployment finished ---"
echo "Please allow a few minutes for GitHub Pages to update."
echo "Remember to check your GitHub Pages settings and clear browser cache."