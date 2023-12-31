#[test_only]
module 0xcbc0ac12c077e960cd789ac576b11683ba6f0ca2cab13f0b3057f846e916f04d::counter_tests
{
    use std::signer;
    use std::unit_test;
    use std::vector;

    use 0xcbc0ac12c077e960cd789ac576b11683ba6f0ca2cab13f0b3057f846e916f04d::counter;  

    fun get_account(): signer
    {
        vector::pop_back(&mut unit_test::create_signers_for_testing(1))
    }

    #[test]
    public entry fun test_if_it_inti()
    {
        let account = get_account();
        let addr = signer::address_of(&account);

        aptos_framework::account::create_account_for_test(addr);
        counter::bump(account);
        assert!(
            counter::get_count(addr) == 0,
            0
        );

        let account = get_account();
        counter::bump(account);
        assert!(
            counter::get_count(addr) == 1,
            0
        )

      
    }
}
