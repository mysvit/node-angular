import { expect } from 'chai'
import { FileHelper } from './file-helper'

describe('FileHelper', () => {

    it('getFileName - from path', () => {
        expect(FileHelper.getFileName('c:\\Program Files\\picture.jpg')).to.be.eq('picture')
        expect(FileHelper.getFileName('/home/sv/avatar.jpg')).to.be.eq('avatar')
    })

    it('getFileName - from name', () => {
        expect(FileHelper.getFileName('picture.jpg')).to.be.eq('picture')
    })

    it('getFileName - no ext', () => {
        expect(FileHelper.getFileName('config-lib')).to.be.eq('config-lib')
    })

    it('getFileExt', () => {
        expect(FileHelper.getFileExt('config.lib.json')).to.be.eq('json')
    })

    it('getFileExt - no ext', () => {
        expect(FileHelper.getFileExt('config-lib')).to.be.eq('')
    })

})
