properties([
  parameters([
    string(
      name: 'APK_URL',
      description: 'URL for the Android mobile app release.'
    )
  ])
])

def website_host = 'node-01.ac-cn-hongkong-c.web.misc.statusim.net'

node('linux') {
  environment {
    GH_USER = gh_user
  }

  stage('Git Prep') {
    checkout scm
  }

  stage('Install Deps') {
    sh 'npm install'
  }

  stage('Build') {
    env.APK_URL = params.APK_URL
    sh 'npm run build'
    sh 'du -hsc dist/*'
  }

  stage('Publish') {
    sshagent(['jenkins-ssh']) {
      sh """
        scp -o StrictHostKeyChecking=no -r dist/. \\
        ${website_host}:/var/www/cn.status.im/
      """
    }
  }
}
