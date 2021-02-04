pipeline {
    stages {

        stage('git checkout'){
            git credentialsId: 'kai-github', url: 'https://github.com/Kaihchen1230/devbops_frontend'
        }

        stage('vertify repo existed') {
            sh ls -a
        }

    }
}
