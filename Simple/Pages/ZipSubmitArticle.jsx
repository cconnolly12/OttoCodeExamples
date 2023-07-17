import { useSelector } from 'react-redux';
import Image from 'next/image';
import format from 'date-fns/format';
import Input from '../../../../Common/ReusedComponents/Input';
import ContinueButton from '../../../../Common/Components/ContinueButton';
import style from '../simple.module.css';
import useLeaveBehindRedirect from '../../../Helpers/useLeaveBehindRedirect';
import useValidation from '../../../../Common/Validation/useValidation';
import BackgroundImage from '../../../../../../public/assets/form-images/person_working_on_computer.jpg';
import Nationwide from '../../../../../../public/images/logos/NationwideLogo.png';
import Esurance from '../../../../../../public/images/logos/EsuranceLogo.png';
import AAA from '../../../../../../public/images/logos/AAAInsuranceLogo.png';
import Farmers from '../../../../../../public/images/logos/FarmersInsuranceLogo.png';
import Mercury from '../../../../../../public/images/logos/MercuryLogo.png';
import Liberty from '../../../../../../public/images/logos/LibertyMutualLogo.png';
import Progressive from '../../../../../../public/images/logos/ProgressiveLogo.png';
import AmericanFamily from '../../../../../../public/images/logos/AmericanFamilyInsuranceLogo.png';
import minFull from '../../../../../../public/assets/form-images/news/difference-between-minimum-and-full-coverage.jpg';
import autoDiscounts from '../../../../../../public/assets/form-images/news/Auto-Insurance-Discounts.jpg';
import factors from '../../../../../../public/assets/form-images/news/7-Factors-That-Influence-Your-Auto-Insurance-Rate.jpg';
import shopAuto from '../../../../../../public/assets/form-images/news/Why-You-Need-To-Shop-For-Insurance-More-Often-Than-You-Think.jpg';
import animalDamage from '../../../../../../public/assets/form-images/news/How-To-Detect-and-Prevent-Animal-Damage-In-Your-Car.jpg';
import { Play } from '../../../../../../public/icons/play';
import { Umbrella } from '../../../../../../public/icons/umbrella';
import { Gears } from '../../../../../../public/icons/gears';
import { Money } from '../../../../../../public/icons/money';
import { PointRight } from '../../../../../../public/icons/PointRight';

export default () => {
  const leaveBehindRedirect = useLeaveBehindRedirect();
  const validate = useValidation();
  const { zipCode, showLoader } = useSelector((store) => store.auto);
  const { brandData } = useSelector((store) => store.main);
  const handleClick = async () => {
    const valid = await validate();
    if (!valid) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    } else {
      leaveBehindRedirect(false, true);
    }
  };

  const zipForm = () => (
    <div className={`${style.listStyle} ${style.articleListStyle}`}>
      <Input
        classes={style}
        name="zipCode"
        placeHolder="Enter Zip Code"
        inputValue={zipCode}
        inputContainer={style.articleInputContainer}
        overrideClasses={style.articleZip}
        type="number"
        disabled={showLoader}
      />
      <ContinueButton
        onClick={handleClick}
        className={`${style.button} ${style.articleContinueButton}`}
        buttonContainer={style.articleInputContainer}
        loaderClass={style.loader}
        overrideStyle={{ marginTop: 8 }}
      >
        Check Rates
        {' '}
        <Play className={style.articleContinueButtonIcon} />
      </ContinueButton>
    </div>
  );

  const zipContainer = () => (
    <div className={style.zipContainer}>
      <div className={style.zipContentContainer}>
        <div className={style.backgroundImageContainer}>
          <Image
            className={style.backgroundImage}
            src={BackgroundImage}
            quality={90}
            priority
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className={style.zipContent}>
          <div className={style.zipContainerTitle}>
            {brandData.display_name}
            {' '}
            Review [
            {(new Date()).getFullYear()}
            ]: Does It Actually Offer Insurance?
          </div>
          <div className={style.zipContainerSubtitle}>
            Get rates, offers & more from top rated insurance providers!
          </div>
          {zipForm()}
          <div className={style.belowZipSection}>
            <div className={style.belowZipTitle}>
              Fast, Easy & Free...
            </div>
            <div className={style.iconInfoContainer}>
              <div>
                <Umbrella className={style.articleZipIcons} />
                Top rated providers & rates.
              </div>
              <div>
                <Gears className={style.articleZipIcons} />
                Personalized quotes in minutes.
              </div>
              <div>
                <Money className={style.articleZipIcons} />
                See how much you could save!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const providers = () => (
    <div className={`grid sm:grid-cols-1 grid-cols-8 gap-4 flex items-center pt-[1rem] w-[70%] mx-auto ${style.articleProvidersGrid}`}>
      <div className={`lg2:w-[25%] md:w-[100%] mx-auto ${style.providerImageContainer}`}>
        <Image
          src={Nationwide}
          width={106}
          height={53}
          alt="Nationwide"
          sizes="103"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={`lg2:w-[25%] md:w-[100%] mx-auto ${style.providerImageContainer}`}>
        <Image
          src={Esurance}
          width={106}
          height={53}
          alt="Esurance"
          sizes="103"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={`lg2:w-[25%] md:w-[100%] mx-auto ${style.providerImageContainer}`}>
        <Image
          src={AAA}
          width={106}
          height={53}
          alt="AAA"
          sizes="103"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={`lg2:w-[25%] md:w-[100%] mx-auto ${style.providerImageContainer}`}>
        <Image
          src={Farmers}
          width={106}
          height={53}
          alt="Farmers"
          sizes="103"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={`lg2:w-[25%] md:w-[100%] mx-auto ${style.providerImageContainer}`}>
        <Image
          src={Mercury}
          width={106}
          height={53}
          alt="Mercury"
          sizes="103"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={`lg2:w-[25%] md:w-[100%] mx-auto ${style.providerImageContainer}`}>
        <Image
          src={Liberty}
          width={106}
          height={53}
          alt="Liberty Mutual"
          sizes="103"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={`lg2:w-[25%] md:w-[100%] mx-auto ${style.providerImageContainer}`}>
        <Image
          src={Progressive}
          width={106}
          height={26}
          alt="progressive"
          sizes="103"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={`lg2:w-[25%] md:w-[100%] mx-auto ${style.providerImageContainer}`}>
        <Image
          src={AmericanFamily}
          width={106}
          height={53}
          alt="American Family"
          sizes="103"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
    </div>
  );

  const contentSectionOne = () => (
    <>
      <h2 className={style.sectionTitles}>
        What is
        {' '}
        {brandData.display_name}
        ?
      </h2>
      <p className={style.paragraph}>
        {brandData.display_name}
        {' '}
        works to help you get car insurance
        rates in seconds for free. We work with an extensive network of
        nationwide carriers, regional carriers, and individual agents to get
        you the best car insurance premiums available.
      </p>
      <h3 className={style.sectionSubTitles}>
        Is
        {' '}
        {brandData.display_name}
        {' '}
        legit?
      </h3>
      <p className={style.paragraph}>
        {brandData.display_name}
        {' '}
        is a lead generation site that connects consumers with insurance
        agencies and carriers. We provide auto insurance
        rates along with quotes for pet, home, and life insurance. It
        is headquartered in Miami Beach, Florida.
      </p>
      <p className={style.paragraph}>
        The company’s owner and CEO is Joshua Keller. Keller is an entrepreneur
        responsible for establishing several companies, including Union Square
        Media Group, the parent company of
        {' '}
        {brandData.display_name}
        .
      </p>
      <p className={style.paragraph}>
        The
        {' '}
        {brandData.display_name}
        {' '}
        website gets over 1.7 million visitors per month.
      </p>
    </>
  );

  const contentSectionTwo = () => (
    <>
      <h2 className={style.sectionTitles}>
        What insurance does
        {' '}
        {brandData.display_name}
        {' '}
        offer?
      </h2>
      <p className={style.paragraph}>
        {brandData.display_name}
        {' '}
        works with over 1,000 affiliate insurance
        companies that offer different types of car insurance
        coverage, such as:
      </p>
      <ul className={style.listItems}>
        <li>
          <strong>Liability coverage</strong>
          : Most states require all drivers carry a minimum level of bodily
          injury liability and property damage liability that will help to
          cover injuries and damage to another driver if you are in an
          accident and found to be at fault.
        </li>
        <li>
          <strong>Collision</strong>
          : This assists in covering damage to your vehicle if you are in
          an accident with another car or an object like a fence or light
          post. Collision insurance helps to pay to repair or replace your
          vehicle regardless of who was at fault for the accident.
        </li>
        <li>
          <strong>Comprehensive</strong>
          : This coverage helps to pay to repair or replace your car if
          it is damaged by something other than a collision. Covered
          incidents could be vandalism, fire, water damage, theft, and
          accidents with animals like deer.
        </li>
        <li>
          <strong>Personal injury protection (PIP)</strong>
          : If you are in an accident, PIP insurance helps to cover your
          medical expenses, lost wages, or funeral expenses, regardless
          of who was at fault.
        </li>
        <li>
          <strong>Uninsured/underinsured motorist</strong>
          : This coverage helps to protect you if you are in an accident
          with someone who has no or little car insurance.
        </li>
        <li>
          <strong>Medical expense</strong>
          : This coverage is a backup to your health insurance coverage
          to help cover your medical bills if you get in an accident.
        </li>
        <li>
          <strong>Guaranteed Auto Protection (GAP) insurance</strong>
          : If you are still financing your car and get into an accident,
          this coverage pays the difference between the current value of
          the car and the original amount of your car loan.
        </li>
        <li>
          <strong>Rental reimbursement</strong>
          : When your car is damaged in an accident, this coverage will
          reimburse you up to the policy maximum if you need to rent a car
          while yours is being repaired.
        </li>
        <li>
          <strong>Roadside assistance and towing</strong>
          : This coverage is helpful if your car battery dies, you get a
          flat tire, or you lock your keys in the car.
        </li>
        <li>
          <strong>Non-owner insurance</strong>
          : This covers any property damage or injuries you cause when driving
          a car you don’t own, like a rental car or if you borrow a friend's car.
        </li>
      </ul>
      <p className={style.paragraph}>
        The
        {' '}
        {brandData.display_name}
        {' '}
        website also enables you to get quotes on other types of insurance:
      </p>
      <ul className={style.listItems}>
        <li>
          Pet insurance.
        </li>
        <li>
          Home insurance.
        </li>
        <li>
          Life insurance.
        </li>
      </ul>
      <p className={style.paragraph}>
        During the quote process, you’ll be asked if you are interested in bundling
        your car insurance with your home or renter’s insurance. Your answer
        factors into the insurance carrier
        {' '}
        {brandData.display_name}
        {' '}
        recommends to you.
      </p>

      <h3 className={style.sectionSubTitles}>How to find discounts</h3>
      <p className={style.paragraph}>
        One of the best ways to save money on your car insurance plan is to ask
        about the possible discounts
      </p>
      <p className={style.paragraph}>
        Available auto insurance discounts could include:
      </p>
      <ul className={style.listItems}>
        <li>
          <strong>Automatic payments</strong>
          : Many insurers will give you a discount on your car insurance
          premiums if you set up automatic payments from your checking
          account or credit card.
        </li>
        <li>
          <strong>Defensive driving</strong>
          : You could get this discount by taking a certified defensive
          driving course.
        </li>
        <li>
          <strong>Distant student</strong>
          : You may qualify for this discount if you have a full-time
          student who isn’t using your car while they are away at college.
        </li>
        <li>
          <strong>Good student</strong>
          : Many insurers offer discounts for full-time students who
          maintain a B or higher grade average at school.
        </li>
        <li>
          <strong>Homeowners</strong>
          : You may be eligible for a discount just for owning a home,
          regardless if your homeowner's insurance is with the same insurer.
        </li>
        <li>
          <strong>Multi-car</strong>
          : You could save money if you have several vehicles that you
          need to insure and you put them on the same policy.
        </li>
        <li>
          <strong>Multi-policy</strong>
          : You could get a discount by bundling your car insurance
          with other insurance policies such as your homeowner's or
          renter's insurance.
        </li>
        <li>
          <strong>Pay in full</strong>
          : Your premiums may cost less if you pay upfront for six months
          to a year rather than pay monthly.
        </li>
        <li>
          <strong>Safe driver</strong>
          : If you haven’t had any traffic tickets or accidents in the
          past three years, you may qualify for a safe driver discount.
          Some insurers also provide discounts for drivers who use a
          special device or mobile app that monitors their driving habits.
        </li>
      </ul>

      <h2 className={style.sectionTitles}>How to maximize savings</h2>
      <p className={style.paragraph}>
        There are several things you can do to maximize your savings on car insurance.
      </p>
      <p className={style.paragraph}>
        To get a better policy premium, you could:
      </p>

      <h3 className={style.sectionSubTitles}>Improve your credit score</h3>
      <p className={style.paragraph}>
        Your credit score could impact how much you have to pay for car insurance.
        Insurance companies consider drivers with low credit scores at a higher
        risk of filing a claim. There are only three states – California, Hawaii,
        and Massachusetts – that prohibit insurers from using your credit score
        as a factor in determining your rate. If you live anywhere else,
        you may want to strive for a credit score of 700 or higher to
        save money on car insurance.
      </p>

      <h3 className={style.sectionSubTitles}>Drive a different car</h3>
      <p className={style.paragraph}>
        The type of car you drive also impacts how much you’ll
        be charged for car insurance. That Tesla might impress your
        friends, but it’ll cost you more for insurance than a
        run-of-the-mill sedan. High-priced cars like a Porsche, BMW,
        or Lexus may cost more to insure because they are more likely
        to get stolen.
      </p>
      <p className={style.paragraph}>
        You could also save money on car insurance by driving an older car
        or one that is equipped with safety features like airbags and
        anti-lock brakes.
      </p>

      <h3 className={style.sectionSubTitles}>Maintain a clean driving record</h3>
      <p className={style.paragraph}>
        The fewer traffic citations and accidents you have, the better when it
        comes to getting low-cost car insurance. Insurance companies consider
        drivers who have many tickets or claims a higher risk, which means those
        drivers have to pay higher premiums. Car insurance premiums typically
        increase by about 49% after an accident.
      </p>

      <h3 className={style.sectionSubTitles}>Shop around</h3>
      <p className={style.paragraph}>
        Insurance companies charge significantly different rates for
        the same level of coverage on car insurance. So it’s important
        to shop around and compare quotes from different insurance companies.
        This is where
        {' '}
        {brandData.display_name}
        {' '}
        comes in handy.
      </p>

      <h2 className={style.sectionTitles}>
        How to get an insurance quote from
        {' '}
        {brandData.display_name}
      </h2>
      <p className={style.paragraph}>
        You start the process by filling out the form below. After finishing the
        process and entering all your information,
        the website will take a minute to think and then declare a “winner”
        insurance company that best fits your needs.
      </p>
      <h2 className={style.sectionTitles}>
        {brandData.display_name}
        {' '}
        FAQs
      </h2>
      <h3 className={style.sectionSubTitles}>
        What is the minimum coverage for
        {' '}
        {brandData.display_name}
        ?
      </h3>
      <p className={style.paragraph}>
        There is no minimum coverage for
        {' '}
        {brandData.display_name}
        . However, nearly all states
        have a
        {' '}
        <a
          href="https://www.iii.org/automobile-financial-responsibility-laws-by-state"
          target="_blank"
          rel="noopener noreferrer"
          className={style.textLink}
        >
          minimum level of car insurance
        </a>
        {' '}
        required for all drivers. You should
        find out what your state requires before getting car insurance quotes.
      </p>

      <h3 className={style.sectionSubTitles}>
        How much does
        {' '}
        {brandData.display_name}
        {' '}
        cost?
      </h3>
      <p className={style.paragraph}>
        There is no cost to get a quote through
        {' '}
        {brandData.display_name}
        .
      </p>

      <h2 className={style.sectionTitles}>Bottom line</h2>
      <p className={style.paragraph}>
        {brandData.display_name}
        {' '}
        is a free website that can help you lower your
        auto insurance by comparing quotes across all of our affiliate
        insurance companies.
      </p>
    </>
  );

  const adContainer = () => (
    <div>
      <button type="button" className={style.adContainerTitleButton} onClick={handleClick}>
        Save On Your Auto Insurance
      </button>
      <div className={style.adContainer}>
        <div className={style.adContainerContent}>
          <div>
            <button type="button" className={style.adContainerLogo} onClick={handleClick}>
              <Image
                src={brandData.logo}
                height={65}
                width={160}
                sizes={160}
                style={{
                  objectFit: 'contain',
                }}
              />
            </button>
            <button type="button" className={style.getQuote} onClick={handleClick}>
              <PointRight className={style.pointRight} />
              Get a quote now
            </button>
          </div>
          <ul className={style.adContainerBullets}>
            <li>Compare dozens of providers in under 5 minutes</li>
            <li>Fast, free and easy way to shop for insurance</li>
            <li>Quickly find the perfect rate for you</li>
          </ul>
          <button type="button" className={style.getQuoteMobile} onClick={handleClick}>
            <PointRight className={style.pointRight} />
            Get a quote now
          </button>
        </div>
      </div>
    </div>

  );

  const authorTag = () => (
    <div className={style.authorContainer}>
      <div className={style.author}>
        By
        {' '}
        <strong>Maddi Butler</strong>
      </div>
      <div>
        {format(new Date(), 'MMMM do, yyyy')}
        {' '}
        / 23 min read
      </div>
    </div>
  );

  const relatedReadingItem = (image, title, link) => (
    <a href={link} className={style.articleRelatedItem} target="_blank" rel="noreferrer">
      <div className={style.articleRelatedImg}>
        <Image
          src={image}
          quality={90}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>
      <div className={style.articleRelatedTitle}>
        <small className={style.articleRelatedTitleCategory}>Insurance</small>
        <h3>{title}</h3>
      </div>
    </a>
  );

  return (
    <div className={style.zipArticleContainer}>
      {zipContainer()}
      {providers()}
      <div className={style.contentGridContainer}>
        <div className={style.widthContentGrid}>
          <div className={style.contentContainer}>
            {authorTag()}
            {contentSectionOne()}
            {adContainer()}
            {contentSectionTwo()}
            {adContainer()}
          </div>
          <div className={style.articles}>
            <h2>Related Reading</h2>
            {relatedReadingItem(
              minFull,
              'The Difference Between Minimum And Full Auto Insurance Coverage',
              'https://ottoinsurance.com/news/difference-between-minimum-and-full-coverage.html',
            )}
            {relatedReadingItem(
              autoDiscounts,
              '9 Auto Insurance Discounts To Take Advantage Of On Your Next Policy',
              'https://ottoinsurance.com/news/Auto-Insurance-Discounts.html',
            )}
            {relatedReadingItem(
              factors,
              '7 Factors That Influence Your Auto Insurance Rates',
              'https://ottoinsurance.com/news/7-Factors-That-Lower-Auto-Rates.html',
            )}
            {relatedReadingItem(
              shopAuto,
              'Why You Need To Shop For Insurance More Often Than You Think',
              'https://ottoinsurance.com/news/Why-You-Need-To-Shop-For-Insurance-More-Often-Than-You-Think.html',
            )}
            {relatedReadingItem(
              animalDamage,
              'How To Detect And Prevent Animal Damage In Your Car',
              'https://ottoinsurance.com/news/How-To-Detect-and-Prevent-Animal-Damage-In-Your-Car.html',
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
