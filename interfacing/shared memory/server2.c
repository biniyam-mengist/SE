#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <stdio.h>
#include <stdlib.h>




int main(){

	char c;
	int shmid;
	key_t key;
	int *shm;
	char *message;


	key = 1234;

	shmid = shmget(key, sizeof(int), IPC_CREAT | 0666);
	shm = shmat(shmid,NULL, 0);

	printf("The shared id is %d\n", shmid);

	//scanf("%s\n",shm);
	*shm = 12;
	//printf("THe message is: %s\n",message);
	printf("The data in the shared memory is %d\n",*shm);

	while(*shm == 12) sleep(1);

	printf("The data in the shared memory has been changed to %d\n",*shm);

exit(0);

return 0;

}
