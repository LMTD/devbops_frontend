pipeline {
    stages {
        stage('Build') {
            steps {
               echo "installing required packages" 
               sh 'npm ci'
            }

        }
        stage('Test') {
            steps {
                echo "in the test stage"
                sh 'npm run test-once'
            }
        }

    }
}
