#include<sys/types.h>
#include<sys/wait.h>
#include<unistd.h>
#include<stdlib.h>
#include<stdio.h>


int main(){

	int fd[2];
	int fd2[2];
	pid_t pid;
	
	pipe(fd);
	pipe(fd2);

	pid = fork();

	if(pid==0){
		close(fd[0]);
	        close(fd2[1]);
		int readVal;
		read(fd2[0],&readVal,sizeof(int));
		printf("Recieved number is %d\n",readVal);
		int sqr= readVal*readVal;

		write(fd[1],&sqr,sizeof(int));

		
	}

	else if(pid>0){
		close(fd[1]);
	        close(fd2[0]);

		int val = rand() % 10;
		printf("Generated number is %d\n",val);
		write(fd2[1],&val,sizeof(int));


		wait(NULL);
		int readSqr;
		read(fd[0],&readSqr,sizeof(int));
		printf("squared number is %d\n",readSqr);	


	}	
	else{		printf("Error\n");}









return 0;}
