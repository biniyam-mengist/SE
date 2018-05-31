#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <stdio.h>
#include <stdlib.h>





void main(){

	int shmid;
	key_t key;
	int *shm;
	key = 1234;


	shmid = shmget(key, sizeof(int), 0666);
	shm = shmat(shmid, NULL, 0);
	printf("THe shared id is %d\n",shmid);
	printf("THe value in the shared memory is %d\n\n",*shm);

	*shm = 144;

	printf("THe value in the shared memory is %d\n",*shm);

	exit(0);


}
