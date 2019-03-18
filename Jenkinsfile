pipeline {
  agent { label 'linux' }

  parameters {
    string(
      name: 'APK_URL',
      description: 'URL for the Android mobile app release.'
    )
  }

  environment {
    SSH_CMD = 'ssh -o StrictHostKeyChecking=no'
    WEBSITE_HOST = 'node-01.ac-cn-hongkong-c.web.misc.statusim.net'
    APK_URL = "${params.APK_URL}"
  }

  stages {
    stage('Deps') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Build') {
      steps {
        sh 'yarn run clean'
        sh 'yarn run build'
        print 'Size of built artifacts:'
        sh 'du -hsc dist/*'
      }
    }

    stage('Publish') {
      steps {
        sshagent(['jenkins-ssh']) {
          sh "rsync -e \"${SSH_CMD}\" -rtz --del dist/ ${WEBSITE_HOST}:/var/www/cn.status.im/"
        }
      }
    }
  }
}
