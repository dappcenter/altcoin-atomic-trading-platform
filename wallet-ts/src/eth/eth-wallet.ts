/**
 * Ethereum wallet TS
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

import {AtomicSwapAbi} from "../config/abi/atomicswap";
import {AtomicSwapBin} from "../config/abi/bin";
import * as AppConfig from "../config/config-eth";
import {IEthAccount} from "./eth-account";
import {EthAtomicSwap} from "./eth-atomic-swap";

export class EthWallet {
  private atomicSwap: any;

  constructor() {
    this.atomicSwap = new EthAtomicSwap(AtomicSwapAbi, AppConfig.EthConfiguration.hosts[0], AtomicSwapBin);
  }

  /**
   * Login
   * @param keystore
   * @param password
   */
  public login(keystore, password) {
    return this.atomicSwap.engine.login(keystore, password);
  }

  /**
   * Create account
   * @param password
   * @returns {{wallet, keystore}}
   */
  public create(password): IEthAccount {
    return this.atomicSwap.engine.createAccount(password);
  }

  /**
   * Recover account with password
   * @param password
   * @param privateKey
   * @returns {{wallet, keystore}}
   */
  public recover(privateKey, password) {
    return this.atomicSwap.engine.recoverAccount(privateKey, password);
  }

  /**
   * Get wallet balance
   * @param address
   * @returns {*}
   */
  public async getbalance(address) {
    return await this.atomicSwap.engine.getBalance(address);
  }

  /**
   * Send All Ether
   * @param privateKey
   * @param toAddress
   * @returns {Promise<number>}
   */
  public sendAllEther(privateKey, toAddress) {
    return this.atomicSwap.engine.sendAllEther(privateKey, toAddress);
  }

  /**
   * Initiate atomic swap
   * @param refundTime
   * @param secret
   * @param address
   * @param amount
   * @returns {Promise.<*>}
   */
  public async initiate(refundTime, secret, address, amount): Promise<any> {

    let secretObj = null;

    if (secret === "") {
      secretObj = this.atomicSwap.common.GenerateSecret();
      if (secretObj.hashedSecret.indexOf("0x") === -1) {
        secret = "0x" + secretObj.hashedSecret;
      } else {
        secret = secretObj.hashedSecret;
      }
    }

    const result = await this.atomicSwap.initiate(refundTime, secret, address, amount);
    result.secret = secretObj;
    return result;
  }

  /**
   * Participate in atomic swap
   * @param refundTime
   * @param secret
   * @param address
   * @param amount
   * @returns {Promise.<*>}
   */
  public async participate(refundTime, secret, address, amount): Promise<any> {
    const result = await this.atomicSwap.Participate(refundTime, secret, address, amount);
    return result;
  }

  /**
   * Extract swap info
   * @param hashedSecret
   * @returns {Promise.<*>}
   */
  public async extractsecret(hashedSecret): Promise<any> {
    const result = await this.atomicSwap.ExtractSecret(hashedSecret);
    return result;
  }

  /**
   * Redeem atomic swap
   * @param secret
   * @param hashedSecret
   * @returns {Promise.<*>}
   */
  public async redeem(secret, hashedSecret): Promise<any> {
    const result = await this.atomicSwap.Redeem(secret, hashedSecret);
    return result;
  }

  /**
   * Refund atomic swap
   * @param hashedSecret
   * @returns {Promise.<*>}
   */
  public async refund(hashedSecret): Promise<any> {
    const result = await this.atomicSwap.Refund(hashedSecret);
    return result;
  }
}
