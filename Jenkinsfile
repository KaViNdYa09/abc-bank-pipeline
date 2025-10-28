pipeline {
    // Run on the main Jenkins server (your EC2 instance)
    agent any 

    stages {

        // Stage 1: Check out the code from your private GitHub repo
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from GitHub...'

                // This tells Jenkins to use the credential with the ID 'github-pat'
                // which you created in the Jenkins Credentials manager.
                git branch: 'main', 
                    credentialsId: 'github-pat', 
                    url: 'https://github.com/KaViNdYa09/abc-bank-pipeline.git'
            }
        }

        // Stage 2: Run the Ansible playbook
        stage('Deploy with Ansible') {
            steps {
                echo '🚀 Running Ansible playbook...'

                // This runs the *exact* command you already tested successfully.
                // Jenkins has permission to run Docker/Ansible
                // because you added the 'jenkins' user to the 'docker' group
                // and installed Ansible on the server.
                sh 'ansible-playbook -i ansible/inventory.yml ansible/deploy.yml'
            }
        }
    }

    // Post-build actions: always run, regardless of success or failure
    post {
        always {
            echo '🧹 Cleaning up Jenkins workspace...'
            // This cleans up the files Jenkins checked out 
            // to keep the server tidy.
            cleanWs() 
        }
    }
}
