export const enum QueueName {
  QUEUE_CRAWL_NAME = 'crawl-queue',
  QUEUE_UPLOAD_NAME = 'upload-queue',
  QUEUE_SYNC_NAME = 'sync-queue',
}

export const enum JobName {
  CRAWL_COMIC_JOB_NAME = 'crawl-comic',
  CRAWL_CHAPTER_JOB_NAME = 'crawl-chapter',
  UPDATE_COMIC_JOB_NAME = 'update-comic',
  UPLOAD_DRIVE_JOB_NAME = 'upload-image-to-drive',
}
