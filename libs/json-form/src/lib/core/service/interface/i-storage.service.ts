/**
 * Interface for objects that can be used to store data. The service is expected to store any kind of data that can be encoded as a string.
 *
 * The `StorageService` interface is parameterized on `T` which represents the type of objects which can be read and written.
 */
import {SessionStorageKeyEnum} from "../../model/session-storage-key.enum";
import {localStorageKeyEnum} from "../../model/local-storage-key.enum";


export interface StorageService<T = any> {

	/**
	 * Checks whether an entry with the specified key exists in the storage.
	 *
	 * @param    key Identifier of the entry for which its presence in the storage is to be checked.
	 * @returns `true` if an entry with the specified key exists in the storage, `false` if not.
	 */
	has(key: SessionStorageKeyEnum | localStorageKeyEnum): boolean;

	/**
	 * Retrieves the value stored for the entry that is associated with the specified key. If no such entry exists or if the service for
	 * some reason is unable to fetch the value of the entry then `undefined` will be returned.
	 *
	 * @param     key Identifier of the entry whose value is to be retrieved.
	 * @returns   Value of the entry that is identified by the specified key. In case the entry does not exist or if it cannot be loaded
	 *              (due to a decoding issue), then `undefined` will be returned by this function.
	 */
	get(key: SessionStorageKeyEnum | localStorageKeyEnum): T | undefined;

	/**
	 * Retrieves and delete the value stored for the entry that is associated with the specified key. If no such entry exists or if the service for
	 * some reason is unable to fetch the value of the entry then `undefined` will be returned.
	 *
	 * @param     key Identifier of the entry whose value is to be retrieved.
	 * @returns   Value of the entry that is identified by the specified key. In case the entry does not exist or if it cannot be loaded
	 *              (due to a decoding issue), then `undefined` will be returned by this function.
	 */
	getAndRemove(key: SessionStorageKeyEnum | localStorageKeyEnum): T | undefined;

	/**
	 * Creates or updates the entry identified by the specified key with the given value. Storing a value into the storage service will
	 * ensure that an equivalent of the value can be read back, i.e. the data and structure of the value will be the same. It, however, does
	 * not necessarily return the same reference.
	 *
	 * @param key   Identifier of the entry which is to be created or updated.
	 * @param value Value which is to be stored.
	 */
	set(key: SessionStorageKeyEnum | localStorageKeyEnum, value: T): void;

	/**
	 * Removes the entry that is identified by the specified key. Attempting to remove an entry for an unknown key will have no effect.
	 * Attempting to retrieve an entry via the `get` method after it has been removed will result in `undefined`.
	 *
	 * @param key Identifier of the entry which is to be removed.
	 */
	remove(key: SessionStorageKeyEnum | localStorageKeyEnum): void;

	/**
	 * Clears the storage by removing all entries. Subsequent `get(x)` calls for a key *x* will return `undefined`, until a new value is set
	 * for key *x*.
	 */
	clearAll(): void;
}
