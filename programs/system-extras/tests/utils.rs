use solana_program::{pubkey::Pubkey, system_instruction};
use solana_program_test::{BanksClientError, ProgramTest, ProgramTestContext};
use solana_sdk::{account::Account, signature::Signer, transaction::Transaction};

pub fn program_test() -> ProgramTest {
    ProgramTest::new("mpl_system_extras", mpl_system_extras::id(), None)
}

pub async fn send_transaction(
    context: &mut ProgramTestContext,
    transaction: Transaction,
) -> Result<(), BanksClientError> {
    context.banks_client.process_transaction(transaction).await
}

pub async fn airdrop(
    context: &mut ProgramTestContext,
    receiver: &Pubkey,
    amount: u64,
) -> Result<(), BanksClientError> {
    let transaction = Transaction::new_signed_with_payer(
        &[system_instruction::transfer(
            &context.payer.pubkey(),
            receiver,
            amount,
        )],
        Some(&context.payer.pubkey()),
        &[&context.payer],
        context.last_blockhash,
    );

    send_transaction(context, transaction).await.unwrap();
    Ok(())
}

pub async fn get_account(context: &mut ProgramTestContext, pubkey: &Pubkey) -> Account {
    context
        .banks_client
        .get_account(*pubkey)
        .await
        .expect("account not found")
        .expect("account empty")
}
