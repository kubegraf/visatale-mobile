import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { Btn } from '../../components/ui/Btn';
import { Field } from '../../components/ui/Field';
import {
  CreditCardIcon,
  BankIcon,
  ShieldIcon,
  LockIcon,
} from '../../components/ui/Icons';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'upi', label: 'UPI' },
  { id: 'netbanking', label: 'Net Banking' },
];

function PaymentMethodIcon({ id, color }: { id: string; color: string }) {
  switch (id) {
    case 'card': return <CreditCardIcon size={22} color={color} />;
    case 'upi':
      return (
        <Text style={{ fontSize: 13, fontFamily: 'Inter_700Bold', color, width: 22, textAlign: 'center' }}>
          UPI
        </Text>
      );
    case 'netbanking': return <BankIcon size={22} color={color} />;
    default: return null;
  }
}

export const PaymentScreen: React.FC = () => {
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [upiId, setUpiId] = useState('');

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const formatCardNumber = (v: string) => {
    const clean = v.replace(/\D/g, '').substring(0, 16);
    return clean.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Checkout" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Order summary */}
        <View style={styles.orderCard}>
          <Text style={styles.orderTitle}>Order Summary</Text>
          <View style={styles.orderApplication}>
            <Text style={styles.orderFlag}>🇦🇪</Text>
            <View style={styles.orderInfo}>
              <Text style={styles.orderAppName}>UAE Tourist Visa · 30 days</Text>
              <Text style={styles.orderAppSub}>Pro Plan · 1 traveller</Text>
            </View>
          </View>

          {/* Fee breakdown */}
          <View style={styles.feeList}>
            <View style={styles.feeRow}>
              <View style={styles.feeLabelWrap}>
                <Text style={styles.feeLabel}>Service fee (Pro Plan)</Text>
                <Text style={styles.feeHint}>Includes specialist support & priority</Text>
              </View>
              <Text style={styles.feeValue}>₹2,499</Text>
            </View>

            <View style={styles.transparencyRow}>
              <BankIcon size={18} color={Colors.muted} />
              <View style={styles.transparencyContent}>
                <Text style={styles.transparencyTitle}>Government Visa Fee</Text>
                <Text style={styles.transparencyNote}>
                  AED 300 (~₹6,700) · Paid directly to UAE Embassy at submission
                </Text>
              </View>
              <Text style={styles.transparencyValue}>₹6,700*</Text>
            </View>

            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Platform processing</Text>
              <Text style={styles.feeValue}>₹0</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total today</Text>
              <Text style={styles.totalValue}>₹2,499</Text>
            </View>

            <Text style={styles.govFeeNote}>
              *Govt. fee collected separately when application is submitted to embassy
            </Text>
          </View>

          {/* Money back banner */}
          <View style={styles.moneyBackBanner}>
            <ShieldIcon size={22} color={Colors.emerald} />
            <View style={styles.moneyBackContent}>
              <Text style={styles.moneyBackTitle}>100% Money-Back Guarantee</Text>
              <Text style={styles.moneyBackSub}>
                Full service fee refund if visa rejected due to our error
              </Text>
            </View>
          </View>
        </View>

        {/* Payment method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.methodList}>
            {PAYMENT_METHODS.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.methodRow,
                  method === m.id && styles.methodRowActive,
                ]}
                onPress={() => setMethod(m.id)}
                activeOpacity={0.8}
              >
                <View style={styles.methodIconWrap}>
                  <PaymentMethodIcon
                    id={m.id}
                    color={method === m.id ? Colors.teal : Colors.slate}
                  />
                </View>
                <Text
                  style={[
                    styles.methodLabel,
                    method === m.id && styles.methodLabelActive,
                  ]}
                >
                  {m.label}
                </Text>
                <View
                  style={[
                    styles.radioOuter,
                    method === m.id && styles.radioOuterActive,
                  ]}
                >
                  {method === m.id && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Card form */}
        {method === 'card' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Details</Text>
            <Field
              label="Cardholder Name"
              placeholder="Priya Sharma"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <Field
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChangeText={(t) => setCardNumber(formatCardNumber(t))}
              keyboardType="number-pad"
              maxLength={19}
            />
            <View style={styles.cardRow}>
              <View style={styles.cardRowField}>
                <Field
                  label="Expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChangeText={setExpiry}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
              <View style={styles.cardRowField}>
                <Field
                  label="CVV"
                  placeholder="•••"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="number-pad"
                  maxLength={4}
                  isPassword
                />
              </View>
            </View>
          </View>
        )}

        {/* UPI form */}
        {method === 'upi' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>UPI Details</Text>
            <Field
              label="UPI ID"
              placeholder="yourname@upi"
              value={upiId}
              onChangeText={setUpiId}
              autoCapitalize="none"
            />
            <View style={styles.upiApps}>
              {['GPay', 'PhonePe', 'BHIM', 'Paytm'].map((app) => (
                <TouchableOpacity key={app} style={styles.upiApp} activeOpacity={0.8}>
                  <Text style={styles.upiAppLabel}>{app}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Security badge */}
        <View style={styles.securityRow}>
          <View style={styles.securityInner}>
            <LockIcon size={12} color={Colors.muted} />
            <Text style={styles.securityText}>Secured by Razorpay · PCI DSS compliant</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Btn
          label={loading ? 'Processing…' : 'Pay ₹2,499 →'}
          onPress={handlePay}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  scroll: {
    padding: 20,
    paddingBottom: 20,
    gap: 20,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
  },
  orderTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  orderApplication: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 12,
  },
  orderFlag: {
    fontSize: 28,
  },
  orderInfo: {
    flex: 1,
  },
  orderAppName: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  orderAppSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginTop: 2,
  },
  feeList: {
    gap: 10,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  feeLabelWrap: {
    flex: 1,
    gap: 2,
  },
  feeLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
  },
  feeHint: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  feeValue: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
    marginLeft: 8,
  },
  transparencyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  transparencyIcon: {
    fontSize: 18,
    flexShrink: 0,
  },
  transparencyContent: {
    flex: 1,
  },
  transparencyTitle: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.slate,
  },
  transparencyNote: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    lineHeight: 16,
  },
  transparencyValue: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.muted,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_700Bold',
    color: Colors.ink,
  },
  totalValue: {
    fontSize: FontSizes.xl,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.teal,
  },
  govFeeNote: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    lineHeight: 14,
  },
  moneyBackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  moneyBackIcon: {
    fontSize: 22,
  },
  moneyBackContent: {
    flex: 1,
  },
  moneyBackTitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.emerald,
  },
  moneyBackSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.emerald,
    marginTop: 2,
    lineHeight: 16,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: Colors.ink,
  },
  methodList: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  methodRowActive: {
    backgroundColor: Colors.surface,
  },
  methodIconWrap: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodLabel: {
    flex: 1,
    fontSize: FontSizes.base,
    fontFamily: 'Inter_400Regular',
    color: Colors.ink,
  },
  methodLabelActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: Colors.teal,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.teal,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardRowField: {
    flex: 1,
  },
  upiApps: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  upiApp: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  upiAppLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  securityRow: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  securityInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  securityText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },
});
