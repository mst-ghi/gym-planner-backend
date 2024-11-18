-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(164) NOT NULL,
    `mobile` VARCHAR(30) NOT NULL,
    `email` VARCHAR(150) NULL,
    `national_code` VARCHAR(20) NULL,
    `fullname` VARCHAR(150) NULL,
    `password` VARCHAR(150) NULL,
    `kind` VARCHAR(50) NOT NULL DEFAULT 'athlete',
    `status` VARCHAR(50) NOT NULL DEFAULT 'active',
    `verify_email` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_mobile_key`(`mobile`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_mobile_email_idx`(`mobile`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_profiles` (
    `id` VARCHAR(164) NOT NULL,
    `user_id` VARCHAR(164) NOT NULL,
    `avatar_url` VARCHAR(255) NULL,
    `gender` VARCHAR(50) NULL,
    `blood_type` VARCHAR(20) NULL,
    `marital_status` VARCHAR(50) NULL,
    `job` VARCHAR(50) NULL,
    `education` VARCHAR(150) NULL,
    `address` VARCHAR(255) NULL,
    `weight` SMALLINT NULL,
    `height` SMALLINT NULL,
    `birth_day` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_profiles_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `id` VARCHAR(164) NOT NULL,
    `user_id` VARCHAR(164) NOT NULL,
    `refresh_token` VARCHAR(100) NOT NULL,
    `access_token` VARCHAR(100) NOT NULL,
    `invoked` BOOLEAN NOT NULL DEFAULT false,
    `expires_at` DATETIME(3) NOT NULL,
    `refresh_expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tokens_refresh_token_key`(`refresh_token`),
    UNIQUE INDEX `tokens_access_token_key`(`access_token`),
    INDEX `tokens_refresh_token_access_token_expires_at_refresh_expires_idx`(`refresh_token`, `access_token`, `expires_at`, `refresh_expires_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp` (
    `id` VARCHAR(164) NOT NULL,
    `user_id` VARCHAR(164) NOT NULL,
    `code` VARCHAR(10) NOT NULL,
    `hash` VARCHAR(100) NOT NULL,
    `invoked` BOOLEAN NOT NULL DEFAULT false,
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `otp_hash_key`(`hash`),
    INDEX `otp_hash_idx`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workspaces` (
    `id` VARCHAR(164) NOT NULL,
    `key` VARCHAR(64) NOT NULL,
    `title` VARCHAR(150) NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `workspaces_key_key`(`key`),
    INDEX `workspaces_key_status_idx`(`key`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medias` (
    `id` VARCHAR(164) NOT NULL,
    `workspace_id` VARCHAR(164) NULL,
    `user_id` VARCHAR(164) NOT NULL,
    `originalname` VARCHAR(255) NOT NULL,
    `mimetype` VARCHAR(50) NOT NULL,
    `filename` VARCHAR(150) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `storage` VARCHAR(40) NOT NULL,
    `size` DOUBLE NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `medias_workspace_id_user_id_url_idx`(`workspace_id`, `user_id`, `url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `id` VARCHAR(164) NOT NULL,
    `workspace_id` VARCHAR(164) NOT NULL,
    `user_id` VARCHAR(164) NOT NULL,
    `role` VARCHAR(50) NOT NULL DEFAULT 'owner',
    `selected` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `teams_workspace_id_user_id_idx`(`workspace_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plans` (
    `id` VARCHAR(164) NOT NULL,
    `workspace_id` VARCHAR(164) NULL,
    `priority` SMALLINT NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `discount` SMALLINT NULL DEFAULT 0,
    `period_type` VARCHAR(30) NOT NULL DEFAULT 'month',
    `period_value` SMALLINT NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `cover_url` VARCHAR(255) NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(164) NOT NULL,
    `user_id` VARCHAR(164) NOT NULL,
    `plan_id` VARCHAR(164) NOT NULL,
    `total_price` DOUBLE NOT NULL DEFAULT 0,
    `discount_price` DOUBLE NOT NULL DEFAULT 0,
    `meta` JSON NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'created',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `payments_user_id_plan_id_status_idx`(`user_id`, `plan_id`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_plans` (
    `id` VARCHAR(164) NOT NULL,
    `workspace_id` VARCHAR(164) NULL,
    `user_id` VARCHAR(164) NOT NULL,
    `plan_id` VARCHAR(164) NOT NULL,
    `payment_id` VARCHAR(164) NOT NULL,
    `plan_snapshot` JSON NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'avtive',
    `reservation_at` DATETIME(3) NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_plans_payment_id_key`(`payment_id`),
    INDEX `user_plans_user_id_plan_id_payment_id_status_idx`(`user_id`, `plan_id`, `payment_id`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_records` (
    `id` VARCHAR(164) NOT NULL,
    `user_id` VARCHAR(164) NOT NULL,
    `workspace_id` VARCHAR(164) NULL,
    `practice_history` VARCHAR(100) NULL,
    `taking_sports_supplements` VARCHAR(100) NULL,
    `history_of_bone_fracture` VARCHAR(100) NULL,
    `food_allergy` VARCHAR(100) NULL,
    `wake_up_time` VARCHAR(40) NULL,
    `breakfast_time` VARCHAR(40) NULL,
    `lunch_time` VARCHAR(40) NULL,
    `dinner_time` VARCHAR(40) NULL,
    `sleeping_time` VARCHAR(40) NULL,
    `practice_time` VARCHAR(40) NULL,
    `note` VARCHAR(255) NULL,
    `front_media_url` VARCHAR(350) NULL,
    `right_media_url` VARCHAR(350) NULL,
    `left_media_url` VARCHAR(350) NULL,
    `back_media_url` VARCHAR(350) NULL,
    `front_arm_media_url` VARCHAR(350) NULL,
    `back_arm_media_url` VARCHAR(350) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `medical_records_user_id_key`(`user_id`),
    INDEX `medical_records_workspace_id_idx`(`workspace_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` VARCHAR(164) NOT NULL,
    `owner_id` VARCHAR(164) NOT NULL,
    `cover_url` VARCHAR(350) NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `tags` VARCHAR(300) NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'avtive',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `posts_tags_idx`(`tags`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likes` (
    `id` VARCHAR(164) NOT NULL,
    `post_id` VARCHAR(164) NOT NULL,
    `user_id` VARCHAR(164) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `body_parts` (
    `id` VARCHAR(164) NOT NULL,
    `workspace_id` VARCHAR(164) NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(350) NULL,
    `media_url` VARCHAR(350) NULL,
    `level` VARCHAR(50) NOT NULL DEFAULT 'beginner',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `body_parts_workspace_id_idx`(`workspace_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipments` (
    `id` VARCHAR(164) NOT NULL,
    `workspace_id` VARCHAR(164) NULL,
    `title` VARCHAR(200) NOT NULL,
    `title_en` VARCHAR(200) NULL,
    `description` VARCHAR(350) NULL,
    `media_url` VARCHAR(350) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercises` (
    `id` VARCHAR(164) NOT NULL,
    `body_part_id` VARCHAR(164) NOT NULL,
    `equipment_id` VARCHAR(164) NULL,
    `title` VARCHAR(250) NOT NULL,
    `title_en` VARCHAR(250) NOT NULL,
    `cover_url` VARCHAR(350) NULL,
    `media_url` VARCHAR(350) NULL,
    `description` TEXT NULL,
    `gender` VARCHAR(50) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workout_programs` (
    `id` VARCHAR(164) NOT NULL,
    `workspace_id` VARCHAR(164) NULL,
    `user_plan_id` VARCHAR(164) NULL,
    `couch_id` VARCHAR(164) NOT NULL,
    `user_id` VARCHAR(164) NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` VARCHAR(350) NULL,
    `voice_url` VARCHAR(350) NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'active',
    `started_at` DATETIME(3) NULL,
    `ended_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workout_program_items` (
    `id` VARCHAR(164) NOT NULL,
    `program_id` VARCHAR(164) NOT NULL,
    `exercise_id` VARCHAR(164) NOT NULL,
    `day` SMALLINT NOT NULL DEFAULT 1,
    `priority` SMALLINT NOT NULL DEFAULT 0,
    `frequency` SMALLINT NOT NULL DEFAULT 1,
    `times` SMALLINT NOT NULL DEFAULT 10,
    `is_super` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_programs` (
    `id` VARCHAR(164) NOT NULL,
    `workspace_id` VARCHAR(164) NULL,
    `user_plan_id` VARCHAR(164) NULL,
    `couch_id` VARCHAR(164) NOT NULL,
    `user_id` VARCHAR(164) NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` VARCHAR(350) NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'active',
    `started_at` DATETIME(3) NULL,
    `ended_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_program_items` (
    `id` VARCHAR(164) NOT NULL,
    `program_id` VARCHAR(164) NOT NULL,
    `cause` VARCHAR(164) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_weights` (
    `id` VARCHAR(164) NOT NULL,
    `workspace_id` VARCHAR(164) NULL,
    `user_id` VARCHAR(164) NOT NULL,
    `weight` SMALLINT NOT NULL DEFAULT 1,
    `date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_profiles` ADD CONSTRAINT `user_profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_plans` ADD CONSTRAINT `user_plans_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_plans` ADD CONSTRAINT `user_plans_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_plans` ADD CONSTRAINT `user_plans_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `payments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercises` ADD CONSTRAINT `exercises_body_part_id_fkey` FOREIGN KEY (`body_part_id`) REFERENCES `body_parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercises` ADD CONSTRAINT `exercises_equipment_id_fkey` FOREIGN KEY (`equipment_id`) REFERENCES `equipments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout_programs` ADD CONSTRAINT `workout_programs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout_program_items` ADD CONSTRAINT `workout_program_items_program_id_fkey` FOREIGN KEY (`program_id`) REFERENCES `workout_programs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout_program_items` ADD CONSTRAINT `workout_program_items_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `food_programs` ADD CONSTRAINT `food_programs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `food_program_items` ADD CONSTRAINT `food_program_items_program_id_fkey` FOREIGN KEY (`program_id`) REFERENCES `food_programs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_weights` ADD CONSTRAINT `user_weights_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
