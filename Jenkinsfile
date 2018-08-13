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
    sh 'npm run build'
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
