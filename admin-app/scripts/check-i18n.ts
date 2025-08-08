import type { TranslationMessages } from 'ra-core'
import { arabicMessages } from '../src/i18n/arabic'

// Ensure that arabicMessages conforms to TranslationMessages interface
const _messages: TranslationMessages = arabicMessages
void _messages

console.log('Arabic translations structure is valid')
