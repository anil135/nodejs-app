pipeline {
    agent any

    environment {
        PATH = "$HOME/.nvm/versions/node/v20.14.0/bin:$PATH"
        }
    options {
            skipStagesAfterUnstable()  // Stop the pipeline if a stage fails
        }
    
    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                // Checkout the code from the repository
                git branch: 'main', url: 'https://github.com/anil135/nodejs-app.git'
            }
        }

        stage('Build') {
                steps {
                    sh 'which node'
                    sh 'which npm'
                    sh 'node -v'  
                    sh 'npm -v'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
    
        stage('Test') {
                steps {
                    sh 'npm test --coverage'
            }
        }  

        stage('Store Artifacts') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                archiveArtifacts artifacts: '**/dist/**, **/coverage/**', fingerprint: true
            }
        }
    }
}
