import i18n, { TFunction } from 'i18next';
import { Wallet } from '@lace/cardano';
import { ValidationResult } from '@types';
import { AddressBookSchema } from '@lib/storage';
import { AddressRecordParams } from '@src/features/address-book/context';
import { ToastProps } from '@lace/common';
import { addressErrorMessage, nameErrorMessage } from '@lib/storage/helpers';
import { TOAST_DEFAULT_DURATION } from '@hooks/useActionExecution';
import ErrorIcon from '@assets/icons/address-error-icon.component.svg';
import {
  HandleProvider,
  HandleResolution,
  HandleOwnerChangeError
  // Cardano
} from '@cardano-sdk/core';

const MAX_ADDRESS_BOOK_NAME_LENGTH = 20;

const hasWhiteSpace = (s: string) => s.trim() !== s;

export const verifyHandle = async (
  value: string,
  handleResolver: HandleProvider
): Promise<ValidationResult & { handles?: HandleResolution[] }> => {
  try {
    const resolvedHandles = await handleResolver.resolveHandles({ handles: [value.slice(1)] });
    console.log('>>>>>>>>>> 0.whats going on?');
    if (resolvedHandles.length === 0) {
      return { valid: false };
    }
    console.log('>>>>>2.', resolvedHandles);
    return { valid: true, handles: resolvedHandles };
  } catch (error) {
    return {
      valid: false,
      message: `Error occurred during handle verification: ${error}`
    };
  }
};

export const isValidAddress = (address: string): boolean => {
  let isValid;
  try {
    isValid = Wallet.Cardano.isAddress(address);
  } catch (error) {
    console.log(error.message);
    isValid = false;
  }
  return isValid;
};

export const validateWalletName = (value: string): string => {
  if (!value) return `${i18n.t('browserView.addressBook.form.nameMissing')}`;
  if (hasWhiteSpace(value)) return `${i18n.t('browserView.addressBook.form.nameHasWhiteSpace')}`;
  if (value.length > MAX_ADDRESS_BOOK_NAME_LENGTH) {
    return i18n.t('browserView.addressBook.form.nameIsTooLong', { maxLength: MAX_ADDRESS_BOOK_NAME_LENGTH });
  }
  return '';
};

export const validateWalletAddress = (address: string): string => {
  if (!address) return i18n.t('browserView.addressBook.form.addressMissing');
  if (hasWhiteSpace(address)) return i18n.t('browserView.addressBook.form.addressHasWhiteSpace');
  const isValid = isValidAddress(address);
  return !isValid ? i18n.t('browserView.addressBook.form.incorrectCardanoAddress') : '';
};

// const mockConflictAnswer = new HandleOwnerChangeError(
//   'single_handle',
//   Cardano.PaymentAddress(
//     'addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp'
//   ),
//   Cardano.PaymentAddress(
//     'addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp'
//   )
// );

/**
 *
 * @param value
 * @param handleResolver
 * @returns
 */
export const validateWalletHandle = async (
  value: string,
  address: Cardano.PaymentAddress | undefined,
  handleResolver: HandleProvider
): Promise<string> => {
  try {
    const res = (await verifyHandle(value, handleResolver)).handles;
    if (!res) {
      return i18n.t('general.errors.incorrectHandle');
    }
    return '';
  } catch (error) {
    let responseError;
    console.log('ERROR::::', error);
    if (error instanceof HandleOwnerChangeError) {
      console.error(error.message);
      responseError = error;
    } else {
      console.error('An error occurred during handle validation:', error);
      responseError = i18n.t('general.errors.handleValidationFailed');
    }
    throw responseError;
  }
};

// popup view specific validations
export const validateAddressBookName = (value: string, translateFn: TFunction): ValidationResult =>
  value.length > MAX_ADDRESS_BOOK_NAME_LENGTH
    ? {
        valid: false,
        message: translateFn('addressBook.errors.nameTooLong', { maxLength: MAX_ADDRESS_BOOK_NAME_LENGTH })
      }
    : { valid: true };

export const validateMainnetAddress = (address: string): boolean =>
  // is Shelley era mainnet address
  address.startsWith('addr1') ||
  // is Byron era mainnet Icarus-style address
  address.startsWith('Ae2') ||
  // is Byron era mainnet Daedalus-style address
  address.startsWith('DdzFF');

export const validateTestnetAddress = (address: string): boolean =>
  address.startsWith('addr_test') || (!validateMainnetAddress(address) && Wallet.Cardano.Address.isValidByron(address));

export const validateAddrPerNetwork: Record<Wallet.Cardano.NetworkId, (address: string) => boolean> = {
  [Wallet.Cardano.NetworkId.Mainnet]: (address: string) => validateMainnetAddress(address),
  [Wallet.Cardano.NetworkId.Testnet]: (address: string) => validateTestnetAddress(address)
};

export const isValidAddressPerNetwork = ({
  address,
  network
}: {
  address: string;
  network: Wallet.Cardano.NetworkId;
}): boolean => !address || validateAddrPerNetwork[network](address);

export const hasAddressBookItem = (
  list: AddressBookSchema[],
  record: AddressRecordParams
): [boolean, ToastProps | undefined] => {
  const toastParams = { duration: TOAST_DEFAULT_DURATION, icon: ErrorIcon };
  if (list.some((item) => item.name === record.name))
    return [
      true,
      {
        text: i18n.t(nameErrorMessage),
        ...toastParams
      }
    ];

  if (list.some((item) => item.address === record.address))
    return [
      true,
      {
        text: i18n.t(addressErrorMessage),
        ...toastParams
      }
    ];

  return [false, undefined];
};
