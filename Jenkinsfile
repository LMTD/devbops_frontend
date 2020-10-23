pipeline {
    agent { docker { 
        image 'node:8.12.0' 
        args '-p 3000:3000'
    } 
    }
    environment {
        HOME = '.'
    }

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
                sh 'npm test'
                
            }
        }

    }
}
