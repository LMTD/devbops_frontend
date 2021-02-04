pipeline {
    stages {

        stage('git checkout'){
            git credentialsId: 'kai-github', url: 'https://github.com/Kaihchen1230/devbops_frontend'
        }

        stage('vertify repo existed') {
            sh ls -a
        }
        // stage('Build') {
        //     steps {
        //        echo "installing required packages" 
        //        sh 'npm ci'
        //     }

        // }
        // stage('Test') {
        //     steps {
        //         echo "in the test stage"
        //         sh 'npm run test-once'
        //     }
        // }

    }
}
