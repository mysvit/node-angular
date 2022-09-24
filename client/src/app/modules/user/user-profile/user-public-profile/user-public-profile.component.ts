import { Component, Injector, OnDestroy, OnInit, Renderer2 } from '@angular/core'
import { StatesService } from '@core/services/states.service'
import { PictureModel, UserPublicProfileModel } from '@dto'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { PictureHelper } from '@shared/helper'
import { UploadHelper } from '@shared/helper/upload-helper'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { map } from 'rxjs'
import { UserProfileService } from '../user-profile.service'
import { UserPublicProfileFormModel } from './user-public-profile.form-model'

@Component({
    selector: 'app-user-public-profile',
    templateUrl: './user-public-profile.component.html',
    styleUrls: ['./user-public-profile.component.scss']
})
export class UserPublicProfileComponent extends ProcessForm implements OnInit, OnDestroy {

    FieldValidators = FieldValidators
    formModel = new UserPublicProfileFormModel()

    constructor(
        injector: Injector,
        private renderer: Renderer2,
        private states: StatesService,
        private userProfile: UserProfileService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.userProfile.userProfileModel.subscribe((data) => this.formModel.formGroup.patchValue(data))
    }

    ngOnDestroy(): void {
        this.userProfile.userProfileModel.complete()
    }

    updateProfileClick() {
        if (!this.formModel.isFieldValid()) return
        this.execute(
            this.userProfile.updUserPublicProfile(<UserPublicProfileModel>{nickname: this.formModel.nickname.value}),
            {completedMessage: 'User profile updated.'}
        )
    }

    generateGravatarCommand() {
        const pictureModel = <PictureModel>{
            name: this.formModel.nickname.value.substring(0, 1).toUpperCase(),
            height: 56,
            width: 56,
            ext: 'png'
        }
        pictureModel.contentBase64 = PictureHelper.createImageFromLetter(pictureModel.name, pictureModel.height, pictureModel.width)
        this.formModel.avatarId.setValue('')
        this.execute(
            this.userProfile.updUserProfilePicture(pictureModel)
                .pipe(
                    map(pictureId => this.updateAvatar(pictureId))
                ),
            {completedMessage: 'Gravatar generated.'}
        )
    }

    uploadPictureCommand() {
        UploadHelper.uploadFileClick(this.renderer)
            .then(files => UploadHelper.uploadFileReader(files[0]))
            .then(file => PictureHelper.resizePicture(file, 128, 128))
            .then(pictureModel => {
                this.execute(
                    this.userProfile.updUserProfilePicture(pictureModel)
                        .pipe(
                            map(pictureId => this.updateAvatar(pictureId))
                        ),
                    {completedMessage: 'Picture updated.'}
                )
            })
            .catch(error => this.snackBar?.show(error.message, MessageType.Error))
    }

    private updateAvatar(pictureId: string) {
        this.formModel.avatarId.setValue(pictureId)
        SlStorage.avatar_id = pictureId
    }

}
